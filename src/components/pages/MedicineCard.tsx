import { ShoppingCart } from "lucide-react";
import { BuyLinkItem } from "./BuyLinkItem";

interface BuyLink {
  site: string;
  title: string;
  url: string;
  snippet: string | null;
  price: string | null;
}

interface Medicine {
  name: string;
  description: string;
  composition: string[];
  sideEffects: string[];
  buyLinks: BuyLink[];
  alternatives: string[];
}

interface MedicineCardProps {
  medicine: Medicine;
  isPrimary?: boolean;
}

export function MedicineCard({ medicine, isPrimary = false }: MedicineCardProps) {
  return (
    <div className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 ${
      isPrimary 
        ? 'border-primary/30 bg-gradient-to-br from-white to-primary/5' 
        : 'border-border hover:border-primary/20'
    }`}>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-foreground mb-2">{medicine.name}</h4>
            {medicine.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{medicine.description}</p>
            )}
          </div>
          {isPrimary && (
            <span className="ml-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-bold rounded-full shadow-md whitespace-nowrap animate-float">
              Primary Result
            </span>
          )}
        </div>

        {/* Alternatives */}
        {medicine.alternatives.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border/50">
            <p className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-primary rounded-full" />
              Alternative Names
            </p>
            <div className="flex flex-wrap gap-2">
              {medicine.alternatives.slice(0, 6).map((alt, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-medium text-foreground hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  {alt}
                </span>
              ))}
              {medicine.alternatives.length > 6 && (
                <span className="px-3 py-1.5 text-xs text-muted-foreground font-medium">
                  +{medicine.alternatives.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Buy Links */}
        {medicine.buyLinks.length > 0 ? (
          <div>
            <h5 className="font-bold text-foreground mb-4 flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Where to Buy 
              <span className="text-sm font-semibold text-muted-foreground">
                ({medicine.buyLinks.length} options)
              </span>
            </h5>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {medicine.buyLinks.map((link, idx) => (
                <BuyLinkItem key={idx} link={link} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No buying options available</p>
          </div>
        )}
      </div>
    </div>
  );
}
