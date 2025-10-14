import { Link } from "react-router-dom";
import { Pill, Search, Upload, ShoppingCart, CheckCircle } from "lucide-react";
import { Footer } from "./Footer";
export default function HowItWorks() {
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
            How <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EasyMed</span> Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find the best prices for your medicines in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 mb-16">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white text-2xl font-bold">
                  1
                </div>
                <h2 className="text-3xl font-bold text-foreground">Search or Upload</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Simply type the name of the medicine you're looking for in our search bar, or upload a photo of your prescription. Our intelligent system will identify all the medicines you need.
              </p>
              <div className="flex gap-4 items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  <span>Text Search</span>
                </div>
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <span>Prescription Upload</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 glass-card p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="aspect-video flex items-center justify-center">
                <Search className="h-32 w-32 text-primary opacity-50" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
            <div className="glass-card p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-secondary/10 to-primary/10">
              <div className="aspect-video flex items-center justify-center">
                <ShoppingCart className="h-32 w-32 text-secondary opacity-50" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white text-2xl font-bold">
                  2
                </div>
                <h2 className="text-3xl font-bold text-foreground">Compare Prices</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We instantly search across multiple verified pharmacies and online stores to find the best prices for your medicine. You'll see all available options with real-time pricing, alternative names, and current offers.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Real-time Pricing
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Multiple Pharmacies
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Alternative Options
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white text-2xl font-bold">
                  3
                </div>
                <h2 className="text-3xl font-bold text-foreground">Choose & Save</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Select the option that works best for you and click to visit the pharmacy's website to complete your purchase. It's that simple! Save money while getting the exact medicine you need.
              </p>
              <div className="glass-card p-6 rounded-xl border border-success/30 bg-success/5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Average Savings</p>
                    <p className="text-sm text-muted-foreground">Our users save an average of 30-50% on their medicine purchases</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 glass-card p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-success/10 to-primary/10">
              <div className="aspect-video flex items-center justify-center">
                <CheckCircle className="h-32 w-32 text-success opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="glass-card p-8 md:p-12 rounded-2xl border border-border/50 mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose EasyMed?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">100% Free</h3>
              <p className="text-muted-foreground">No hidden fees, no subscriptions. Our service is completely free for patients.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Verified Sources</h3>
              <p className="text-muted-foreground">We only show results from licensed, verified pharmacies and retailers.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Quick & Easy</h3>
              <p className="text-muted-foreground">Get results in seconds. No registration or account creation required.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Try It Now
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
