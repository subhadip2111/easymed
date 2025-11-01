import { Link, useNavigate, } from "react-router-dom";
import { Pill, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Footer } from "./Footer";
import { useState } from "react";
import { sendContactUsForm } from "../apis/contact-us";

export default function ContactUs() {
  const navigate = useNavigate();
  const [contactUs, setContactUs] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });


  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!contactUs.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!contactUs.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactUs.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!contactUs.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (contactUs.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };


  async function handleChange(e: any) {
    setContactUs({ ...contactUs, [e.target.name]: e.target.value });
  }

  async function handelSubmit(e: any) {
    e.preventDefault();

    // Run validation and surface any errors to the user
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      // Join all error messages into a single alert for now
      alert(Object.values(errors).join('\n'));
      return;
    }

    console.log(contactUs);
    try {
      const contact_usData = await sendContactUsForm(contactUs);
      if (contact_usData) {
        alert("🎉 Thank you for submitting your query! We’ll get back to you soon.");
        setTimeout(() => navigate("/"), 3000);
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending your message. Please try again later.");
    } finally {
      setContactUs({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Pill className="h-8 w-8 text-primary animate-float" />
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MedLinkr
            </h1>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="bg-gradient-primary p-4 rounded-full w-fit mx-auto mb-6">
            <MessageSquare className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions or feedback? We'd love to hear from you. Our team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 animate-scale-in">
            <div className="glass-card p-8 rounded-2xl border border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-primary p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:medilinkr.healthcare@gmail.com" className="text-primary hover:underline">
                      medilinkr.healthcare@gmail.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-primary p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    {/* <h3 className="font-semibold text-foreground mb-1">Phone</h3> */}
                    {/* <a href="tel:1-800-MedLinkr" className="text-primary hover:underline">
                      1-800-MedLinkr
                    </a> */}
                    <p className="text-sm text-muted-foreground mt-1">
                      Mon-Fri: 9AM - 6PM EST
                    </p>
                  </div>
                </div>



              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link to="/about" className="block text-primary hover:underline">
                  About Us
                </Link>
                <Link to="/how-it-works" className="block text-primary hover:underline">
                  How It Works
                </Link>
                <Link to="/privacy-policy" className="block text-primary hover:underline">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="block text-primary hover:underline">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 rounded-2xl border border-border/50 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form className="space-y-6" onSubmit={handelSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactUs.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactUs.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactUs.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactUs.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              By submitting this form, you agree to our Privacy Policy
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16 glass-card p-8 md:p-12 rounded-2xl border border-border/50 animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">How quickly will I get a response?</h3>
              <p className="text-muted-foreground">We aim to respond to all inquiries within 24 hours during business days.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Can you help me choose a medicine?</h3>
              <p className="text-muted-foreground">We provide pricing information only. Please consult your doctor or pharmacist for medical advice.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">How do I report incorrect pricing?</h3>
              <p className="text-muted-foreground">Please email us at support@MedLinkr.com with details, and we'll investigate immediately.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Is my data safe?</h3>
              <p className="text-muted-foreground">Absolutely. We take data privacy seriously. Read our Privacy Policy for details.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
