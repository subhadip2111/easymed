import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg text-foreground mb-4">EasyMed</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted platform to find and compare medicines at the best prices.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  About Us
                </a>
              </li>
              <li>
                <a href="/how-its-work" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  How It Works
                </a>
              </li>
              <li>
           

                   {/* <Link to="/feeds" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Feeds
              </Link> */}
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Contact Us
                </Link>
              </li>
              {/* <Link to="/blogs" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Blogs
              </Link> */}
             
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Disclaimer</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              EasyMed is a medicine information and comparison platform. Always consult your doctor before purchasing or consuming any medicine.
            </p>
          </div>
        </div>
        
        <div className="pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 fill-destructive text-destructive" /> for better healthcare access
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2025 EasyMed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};