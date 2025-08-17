import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Scale, Clock } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Terms of Service</h1>
          <p className="text-xl text-slate-300 mb-6">Clear rules and guidelines for using our VPS hosting services</p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Last updated: January 15, 2024</span>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Version 2.1</Badge>
          </div>
        </div>

        {/* Quick Summary */}
        <Card className="glass-card border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-400" />
              Quick Summary
            </CardTitle>
            <CardDescription className="text-slate-300">
              The key points you need to know about using our services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-400">✓ What's Allowed</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Web hosting and applications</li>
                  <li>• Game servers and communities</li>
                  <li>• Development and testing</li>
                  <li>• Database hosting</li>
                  <li>• Legal business operations</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-red-400">✗ What's Prohibited</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Cryptocurrency mining</li>
                  <li>• DDoS attacks or botnets</li>
                  <li>• Illegal content hosting</li>
                  <li>• Spam or phishing</li>
                  <li>• Resource abuse</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Activities */}
        <Card className="glass-card border-red-500/30">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Prohibited Activities
            </CardTitle>
            <CardDescription className="text-slate-400">
              Activities that will result in immediate account suspension
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">Cryptocurrency Mining</h3>
              <p className="text-slate-300 mb-2">
                Any form of cryptocurrency mining, including but not limited to Bitcoin, Ethereum, Monero, or any other
                digital currencies is strictly prohibited.
              </p>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-300">
                  <strong>Penalty:</strong> Immediate account suspension and potential legal action for resource theft.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">Network Attacks & Botnets</h3>
              <p className="text-slate-300 mb-2">
                DDoS attacks, botnet operations, port scanning, or any malicious network activity is forbidden.
              </p>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-300">
                  <strong>Penalty:</strong> Immediate termination and reporting to law enforcement authorities.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">Illegal Content</h3>
              <p className="text-slate-300 mb-2">
                Hosting, distributing, or facilitating access to illegal content including copyrighted material,
                malware, or prohibited substances.
              </p>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-300">
                  <strong>Penalty:</strong> Account termination and cooperation with legal authorities.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">Spam & Phishing</h3>
              <p className="text-slate-300 mb-2">
                Sending unsolicited emails, operating phishing sites, or any form of fraudulent communication.
              </p>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-300">
                  <strong>Penalty:</strong> Immediate suspension and potential legal action.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage */}
        <Card className="glass-card border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-400" />
              Resource Usage Policy
            </CardTitle>
            <CardDescription className="text-slate-400">Fair usage guidelines for server resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">CPU Usage</h3>
              <p className="text-slate-300 text-sm">
                Sustained high CPU usage (&gt;90% for more than 30 minutes) may trigger automatic throttling. Contact
                support if you need higher performance tiers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Network Bandwidth</h3>
              <p className="text-slate-300 text-sm">
                Each VPS includes generous bandwidth allowances. Excessive usage may result in temporary throttling or
                upgrade requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Storage</h3>
              <p className="text-slate-300 text-sm">
                Storage is allocated per your plan. Exceeding limits will prevent new writes until space is freed or
                plan is upgraded.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account & Billing */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Account & Billing Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Payment Terms</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Services are billed monthly in advance</li>
                <li>• Payment is due within 7 days of invoice date</li>
                <li>• Late payments may result in service suspension</li>
                <li>• Refunds are available within 7 days of initial purchase</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Account Responsibility</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• You are responsible for all activity on your account</li>
                <li>• Keep your login credentials secure</li>
                <li>• Report security breaches immediately</li>
                <li>• Maintain current contact information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Service Availability</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• We target 99.9% uptime but cannot guarantee 100%</li>
                <li>• Scheduled maintenance will be announced 24 hours in advance</li>
                <li>• Emergency maintenance may occur without notice</li>
                <li>• SLA credits available for extended outages</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Enforcement */}
        <Card className="glass-card border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-slate-100">Enforcement & Appeals</CardTitle>
            <CardDescription className="text-slate-400">How we handle violations and your rights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Violation Response</h3>
              <ol className="text-slate-300 text-sm space-y-1">
                <li>
                  1. <strong>Warning:</strong> First-time minor violations receive a warning
                </li>
                <li>
                  2. <strong>Suspension:</strong> Repeated or serious violations result in temporary suspension
                </li>
                <li>
                  3. <strong>Termination:</strong> Severe violations lead to permanent account closure
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Appeal Process</h3>
              <p className="text-slate-300 text-sm mb-2">
                If you believe your account was suspended in error, you may appeal within 30 days:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Submit a support ticket with "APPEAL" in the subject</li>
                <li>• Provide detailed explanation of the situation</li>
                <li>• Include any relevant evidence or documentation</li>
                <li>• Appeals are reviewed within 5 business days</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="glass-card border-green-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Questions about our Terms?</h3>
            <p className="text-slate-300 text-sm mb-4">
              Our support team is here to help clarify any questions about our terms of service.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/support"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                Contact Support
              </a>
              <a
                href="mailto:legal@vpshost.com"
                className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 rounded-lg transition-colors text-sm"
              >
                Email Legal Team
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
