import { Link } from "react-router-dom";
import { Pill, Heart, Shield, Users, Target } from "lucide-react";
import { Footer } from "../Footer";
export default function AboutUs() {
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

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EasyMed</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make healthcare more accessible and affordable by helping you find the best prices for your medicines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in">
            <div className="bg-gradient-primary p-3 rounded-xl w-fit mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower patients with transparent pricing information and help them make informed decisions about their healthcare purchases. We believe everyone deserves access to affordable medication.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gradient-primary p-3 rounded-xl w-fit mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              A world where price is never a barrier to accessing life-saving medications. We envision a healthcare ecosystem built on transparency, trust, and affordability.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-primary p-4 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Trust & Transparency</h3>
              <p className="text-muted-foreground">
                We provide accurate, real-time pricing information from verified sources you can trust.
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-primary p-4 rounded-full w-fit mx-auto mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Patient-First</h3>
              <p className="text-muted-foreground">
                Every decision we make is guided by what's best for patients and their families.
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-primary p-4 rounded-full w-fit mx-auto mb-4">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Accessibility</h3>
              <p className="text-muted-foreground">
                Making healthcare information accessible to everyone, regardless of their background.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-2xl border border-border/50 mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              EasyMed was born from a simple observation: patients were struggling to find affordable medicines, often paying vastly different prices for the same medication at different pharmacies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our founders, having experienced these challenges firsthand, decided to create a platform that brings transparency to medicine pricing. What started as a small project has grown into a comprehensive solution used by thousands of patients daily.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we're proud to help patients save money while ensuring they have access to the medications they need. Our commitment to transparency and patient care drives everything we do.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Start Searching Medicines with EasyMed
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
