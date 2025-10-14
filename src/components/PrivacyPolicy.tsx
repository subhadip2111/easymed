import { Link } from "react-router-dom";
import { Pill, Shield } from "lucide-react";
import { Footer } from "./Footer";
export default function PrivacyPolicy() {
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
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="glass-card p-8 md:p-12 rounded-2xl border border-border/50 space-y-8 animate-scale-in">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              EasyMed collects minimal information to provide our medicine comparison service:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Search queries for medicines</li>
              <li>Prescription images (if uploaded, processed immediately and not stored)</li>
              <li>Basic analytics data (page views, click patterns)</li>
              <li>IP addresses for security and fraud prevention</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your information is used solely to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide accurate medicine pricing information</li>
              <li>Improve our search algorithms and user experience</li>
              <li>Maintain security and prevent abuse</li>
              <li>Generate anonymous analytics to improve our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do NOT sell, rent, or share your personal information with third parties. When you click on a pharmacy link, you'll be redirected to their website, which operates under their own privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Prescription Image Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Uploaded prescription images are processed in real-time to extract medicine names and are immediately deleted after processing. We do not store prescription images on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies to maintain site functionality and basic analytics cookies to understand how our service is used. You can disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data, including encrypted connections (HTTPS), secure servers, and regular security audits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Access your data (minimal as we collect very little)</li>
              <li>Request deletion of any stored data</li>
              <li>Opt-out of analytics tracking</li>
              <li>Update or correct any information we hold</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              EasyMed does not knowingly collect information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy periodically. Changes will be posted on this page with an updated revision date. Continued use of EasyMed constitutes acceptance of these changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this privacy policy or our data practices, please contact us at:
            </p>
            <p className="text-primary font-semibold mt-4">privacy@easymed.com</p>
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
