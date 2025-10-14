import { Link } from "react-router-dom";
import { Pill, FileText } from "lucide-react";
import { Footer } from "./Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Pill className="h-8 w-8 text-primary animate-float" />
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EasyMed
            </h1>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="bg-gradient-primary p-4 rounded-full w-fit mx-auto mb-6">
            <FileText className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="glass-card p-8 md:p-12 rounded-2xl border border-border/50 space-y-8 animate-scale-in">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using EasyMed, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Service Description</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              EasyMed is an informational platform that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Aggregates medicine pricing information from various online pharmacies and retailers</li>
              <li>Provides comparison tools to help users find affordable medicines</li>
              <li>Offers prescription analysis to identify medicines</li>
              <li>Does NOT sell medicines or provide medical advice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Medical Disclaimer</h2>
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-6">
              <p className="text-foreground font-semibold mb-2">IMPORTANT: Always Consult Your Doctor</p>
              <p className="text-muted-foreground leading-relaxed">
                EasyMed provides pricing information only. We are NOT a substitute for professional medical advice. Always consult with a qualified healthcare provider before purchasing or consuming any medicine. Never disregard professional medical advice or delay seeking it because of information found on EasyMed.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">When using EasyMed, you agree to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide accurate information when searching for medicines</li>
              <li>Use the service for lawful purposes only</li>
              <li>Not attempt to circumvent security features or harm the platform</li>
              <li>Verify information with healthcare professionals before making purchases</li>
              <li>Check that any medicine is appropriate for you with your doctor or pharmacist</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to provide accurate, up-to-date pricing information, we cannot guarantee the accuracy, completeness, or timeliness of information displayed. Prices may change, and availability may vary. Always verify current prices and availability with the pharmacy before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              EasyMed contains links to third-party websites (pharmacies and retailers). We are not responsible for the content, privacy practices, or terms of these external sites. When you click on a pharmacy link, you are subject to that pharmacy's terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              EasyMed and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the service, including but not limited to errors in pricing, product information, or availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Prescription Upload</h2>
            <p className="text-muted-foreground leading-relaxed">
              When uploading prescription images, you confirm that you have the right to upload the image and that it contains accurate information. Prescriptions are processed solely to extract medicine names and are not stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on EasyMed, including design, text, graphics, and software, is the property of EasyMed and is protected by copyright and intellectual property laws. You may not copy, modify, or distribute our content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Service Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any aspect of EasyMed at any time without notice. We may also update these Terms of Service periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service are governed by and construed in accordance with applicable laws. Any disputes shall be resolved in appropriate courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-primary font-semibold mt-4">legal@easymed.com</p>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
