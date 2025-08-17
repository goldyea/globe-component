import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Database, Clock } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Privacy Policy</h1>
          <p className="text-xl text-slate-300 mb-6">How we collect, use, and protect your personal information</p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Last updated: January 15, 2024</span>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">GDPR Compliant</Badge>
          </div>
        </div>

        {/* Privacy Summary */}
        <Card className="glass-card border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Privacy at a Glance
            </CardTitle>
            <CardDescription className="text-slate-300">
              Your privacy is our priority. Here's what you need to know.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-200 mb-1">Minimal Collection</h4>
                <p className="text-sm text-slate-400">We only collect data necessary for service operation</p>
              </div>
              <div className="text-center">
                <Lock className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-200 mb-1">Strong Protection</h4>
                <p className="text-sm text-slate-400">Industry-standard encryption and security measures</p>
              </div>
              <div className="text-center">
                <Database className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-200 mb-1">No Selling</h4>
                <p className="text-sm text-slate-400">We never sell your data to third parties</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Information We Collect</CardTitle>
            <CardDescription className="text-slate-400">Types of data we collect and why we need it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">Account Information</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Email address (for account management and communication)</li>
                <li>• Username and password (for account access)</li>
                <li>• Billing information (for payment processing)</li>
                <li>• Contact details (for support and legal requirements)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">Usage Data</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Server resource usage (CPU, RAM, storage, bandwidth)</li>
                <li>• Login times and IP addresses (for security monitoring)</li>
                <li>• Support ticket history (for service improvement)</li>
                <li>• Payment history (for billing and accounting)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">Technical Data</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Server logs (for troubleshooting and security)</li>
                <li>• Network traffic metadata (for abuse prevention)</li>
                <li>• Browser and device information (for platform optimization)</li>
                <li>• Cookies and session data (for website functionality)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-slate-100">How We Use Your Information</CardTitle>
            <CardDescription className="text-slate-400">The purposes for which we process your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Service Provision</h3>
              <p className="text-slate-300 text-sm">
                We use your information to provide, maintain, and improve our VPS hosting services, including server
                provisioning, monitoring, and technical support.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Security & Abuse Prevention</h3>
              <p className="text-slate-300 text-sm">
                Your data helps us detect and prevent fraud, abuse, and security threats to protect both you and other
                users of our platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Communication</h3>
              <p className="text-slate-300 text-sm">
                We use your contact information to send service updates, security alerts, billing notifications, and
                respond to support requests.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Legal Compliance</h3>
              <p className="text-slate-300 text-sm">
                We may process your data to comply with legal obligations, respond to lawful requests, and protect our
                rights and interests.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="glass-card border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-slate-100">Data Sharing & Disclosure</CardTitle>
            <CardDescription className="text-slate-400">When and how we may share your information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">We DO NOT sell your data</h4>
              <p className="text-slate-300 text-sm">
                We never sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Limited Sharing Scenarios</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>
                  • <strong>Service Providers:</strong> Trusted partners who help us operate our services (payment
                  processors, data centers)
                </li>
                <li>
                  • <strong>Legal Requirements:</strong> When required by law, court order, or to protect legal rights
                </li>
                <li>
                  • <strong>Business Transfers:</strong> In case of merger, acquisition, or sale of business assets
                </li>
                <li>
                  • <strong>Consent:</strong> When you explicitly authorize us to share specific information
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="glass-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-slate-100">Your Privacy Rights</CardTitle>
            <CardDescription className="text-slate-400">Control over your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Access & Portability</h4>
                <p className="text-slate-300 text-sm">
                  Request a copy of your personal data in a machine-readable format.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Correction</h4>
                <p className="text-slate-300 text-sm">Update or correct inaccurate personal information.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Deletion</h4>
                <p className="text-slate-300 text-sm">
                  Request deletion of your personal data (subject to legal requirements).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Restriction</h4>
                <p className="text-slate-300 text-sm">Limit how we process your personal information.</p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-slate-300 text-sm">
                To exercise your rights, contact us at{" "}
                <a href="mailto:privacy@vpshost.com" className="text-blue-400 hover:underline">
                  privacy@vpshost.com
                </a>{" "}
                or submit a support ticket. We'll respond within 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="glass-card border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-slate-100">Data Security</CardTitle>
            <CardDescription className="text-slate-400">How we protect your information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Encryption</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• TLS 1.3 for data in transit</li>
                  <li>• AES-256 for data at rest</li>
                  <li>• Encrypted database storage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Access Controls</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Multi-factor authentication</li>
                  <li>• Role-based access control</li>
                  <li>• Regular access reviews</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Monitoring</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• 24/7 security monitoring</li>
                  <li>• Intrusion detection systems</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Compliance</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• GDPR compliance</li>
                  <li>• SOC 2 Type II certified</li>
                  <li>• ISO 27001 standards</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="glass-card border-green-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Privacy Questions?</h3>
            <p className="text-slate-300 text-sm mb-4">
              Contact our Data Protection Officer for any privacy-related inquiries.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="mailto:privacy@vpshost.com"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                Email Privacy Team
              </a>
              <a
                href="/support"
                className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 rounded-lg transition-colors text-sm"
              >
                Submit Support Ticket
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
