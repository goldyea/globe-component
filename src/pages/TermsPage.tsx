import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-muted-foreground mt-2">
          Last updated: January 2025
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            RexNodes Terms of Service
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using RexNodes services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do 
                not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
              <p className="text-muted-foreground">
                RexNodes provides virtual private server (VPS) hosting services. Our services include 
                but are not limited to server provisioning, management tools, and technical support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <div className="text-muted-foreground space-y-2">
                <p>Users are responsible for:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Maintaining the confidentiality of account credentials</li>
                  <li>All activities that occur under their account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring account information is accurate and up-to-date</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Acceptable Use Policy</h2>
              <div className="text-muted-foreground space-y-2">
                <p>Users agree not to use our services for:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Illegal activities or violation of any laws</li>
                  <li>Distributing malware, viruses, or harmful code</li>
                  <li>Unauthorized access to other systems or networks</li>
                  <li>Sending spam or unsolicited communications</li>
                  <li>Hosting adult content or gambling services</li>
                  <li>Cryptocurrency mining without explicit permission</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Service Availability</h2>
              <p className="text-muted-foreground">
                While we strive for maximum uptime, RexNodes does not guarantee 100% service 
                availability. Scheduled maintenance will be announced in advance when possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Payment and Billing</h2>
              <div className="text-muted-foreground space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>Services are billed using our credit system</li>
                  <li>Credits are non-refundable unless required by law</li>
                  <li>Prices are subject to change with 30 days notice</li>
                  <li>Failure to maintain sufficient credits may result in service suspension</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Data and Privacy</h2>
              <p className="text-muted-foreground">
                We are committed to protecting your privacy and data. Our data handling practices 
                are detailed in our Privacy Policy. Users are responsible for backing up their 
                own data and applications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Service Termination</h2>
              <p className="text-muted-foreground">
                RexNodes reserves the right to suspend or terminate services for violation of 
                these terms, non-payment, or other legitimate business reasons. Users may 
                terminate their account at any time through the control panel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                RexNodes shall not be liable for any indirect, incidental, special, or 
                consequential damages arising from the use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Users will be notified 
                of significant changes, and continued use of the service constitutes acceptance 
                of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these terms or our services, please contact our support team 
                through the control panel or at support@rexnodes.com.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}