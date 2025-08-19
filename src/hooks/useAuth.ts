import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  credits: number;
  ram_gb: number;
  disk_gb: number;
  isadmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  refreshUser: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        return { success: false, error: 'Invalid username or password' };
      }

      // In a real app, you'd hash and compare the password
      // For now, simple comparison
      if (data.password_hash !== password) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Create session
      const sessionToken = crypto.randomUUID();
      const sessionExpires = new Date();
      sessionExpires.setHours(sessionExpires.getHours() + 24);

      await supabase
        .from('user_profiles')
        .update({
          session_token: sessionToken,
          session_expires: sessionExpires.toISOString(),
          last_login: new Date().toISOString(),
        })
        .eq('id', data.id);

      localStorage.setItem('sessionToken', sessionToken);
      
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
        full_name: data.full_name,
        credits: data.credits,
        ram_gb: data.ram_gb,
        disk_gb: data.disk_gb,
        isadmin: data.isadmin,
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('sessionToken');
    setUser(null);
  };

  const refreshUser = async () => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('session_token', sessionToken)
        .gt('session_expires', new Date().toISOString())
        .single();

      if (error || !data) {
        localStorage.removeItem('sessionToken');
        setUser(null);
      } else {
        setUser({
          id: data.id,
          username: data.username,
          email: data.email,
          full_name: data.full_name,
          credits: data.credits,
          ram_gb: data.ram_gb,
          disk_gb: data.disk_gb,
          isadmin: data.isadmin,
        });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('sessionToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return {
    user,
    loading,
    login,
    logout,
    refreshUser,
  };
};

export { AuthContext };