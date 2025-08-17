import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Zap, Shield, Server, Database, Gamepad2, TrendingUp } from "lucide-react"

const docCategories = [
  {
    title: "Getting Started",
    description: "Quick setup guides and basic configuration",
    icon: Zap,
    color: "text-green-400",
    borderColor: "border-green-500/30",
    articles: [
      { title: "Quick Start Guide", href: "/docs/quick-start", difficulty: "Beginner" },
      { title: "First VPS Setup", href: "/docs/first-setup", difficulty: "Beginner" },
      { title: "SSH Connection", href: "/docs/ssh-connection", difficulty: "Beginner" },
    ],
  },
  {
    title: "Security & Hardening",
    description: "Protect your server with best practices",
    icon: Shield,
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    articles: [
      { title: "Security Best Practices", href: "/docs/security", difficulty: "Intermediate" },
      { title: "Firewall Configuration", href: "/docs/firewall", difficulty: "Intermediate" },
      { title: "SSL/TLS Setup", href: "/docs/ssl", difficulty: "Advanced" },
    ],
  },
  {
    title: "Web Servers",
    description: "Host websites and web applications",
    icon: Server,
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    articles: [
      { title: "Nginx Configuration", href: "/docs/nginx", difficulty: "Intermediate" },
      { title: "Apache Setup", href: "/docs/apache", difficulty: "Intermediate" },
      { title: "Node.js Applications", href: "/docs/nodejs", difficulty: "Advanced" },
    ],
  },
  {
    title: "Databases",
    description: "Set up and manage database systems",
    icon: Database,
    color: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    articles: [
      { title: "MySQL Installation", href: "/docs/mysql", difficulty: "Intermediate" },
      { title: "PostgreSQL Setup", href: "/docs/postgresql", difficulty: "Intermediate" },
      { title: "MongoDB Configuration", href: "/docs/mongodb", difficulty: "Advanced" },
    ],
  },
  {
    title: "Game Servers",
    description: "Deploy and manage game servers",
    icon: Gamepad2,
    color: "text-pink-400",
    borderColor: "border-pink-500/30",
    articles: [
      { title: "Minecraft Server", href: "/docs/minecraft", difficulty: "Beginner" },
      { title: "CS2 Server Setup", href: "/docs/cs2", difficulty: "Intermediate" },
      { title: "Rust Server", href: "/docs/rust", difficulty: "Intermediate" },
    ],
  },
  {
    title: "Performance & Optimization",
    description: "Optimize your server for maximum performance",
    icon: TrendingUp,
    color: "text-orange-400",
    borderColor: "border-orange-500/30",
    articles: [
      { title: "System Optimization", href: "/docs/optimization", difficulty: "Advanced" },
      { title: "Memory Management", href: "/docs/memory", difficulty: "Advanced" },
      { title: "Network Tuning", href: "/docs/network", difficulty: "Advanced" },
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">VPS Documentation</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Comprehensive guides to help you get the most out of your virtual private server. From basic setup to advanced
          optimization techniques.
        </p>
      </div>

      {/* Quick Start Banner */}
      <Card className="glass-card border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <BookOpen className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-100 mb-2">New to VPS hosting?</h3>
              <p className="text-slate-300 mb-4">
                Start with our comprehensive quick start guide to get your first server up and running in minutes.
              </p>
              <Link
                href="/docs/quick-start"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docCategories.map((category) => (
          <Card key={category.title} className={`glass-card ${category.borderColor}`}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <category.icon className={`h-6 w-6 ${category.color}`} />
                <CardTitle className="text-slate-100">{category.title}</CardTitle>
              </div>
              <CardDescription className="text-slate-400">{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.articles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors group"
                  >
                    <span className="text-slate-300 group-hover:text-slate-100 text-sm">{article.title}</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        article.difficulty === "Beginner"
                          ? "bg-green-500/20 text-green-400"
                          : article.difficulty === "Intermediate"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {article.difficulty}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Articles */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-400" />
            Popular Articles
          </CardTitle>
          <CardDescription className="text-slate-400">Most viewed documentation this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Security Best Practices", views: "12.3k", href: "/docs/security" },
              { title: "Nginx Configuration", views: "8.7k", href: "/docs/nginx" },
              { title: "MySQL Installation", views: "6.2k", href: "/docs/mysql" },
              { title: "Minecraft Server Setup", views: "5.8k", href: "/docs/minecraft" },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors group"
              >
                <span className="text-slate-300 group-hover:text-slate-100">{article.title}</span>
                <span className="text-xs text-slate-500">{article.views} views</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
