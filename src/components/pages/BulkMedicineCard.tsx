import { ShoppingCart } from "lucide-react";
import { BuyLinkItem } from "./BuyLinkItem";

interface BuyLink {
  site: string;
  title: string;
  url: string;
  snippet: string | null;
  price: string | null;
}

interface BulkMedicine {
  buyLinks: BuyLink[];
  alternativeNames: string[];
}

interface BulkMedicineCardProps {
  medicine: BulkMedicine;
  medicineName: string;
}

export function BulkMedicineCard({ medicine, medicineName }: BulkMedicineCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border-2 border-border hover:border-secondary/20 transition-all duration-300 hover:-translate-y-1">
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-foreground">{medicineName}</h4>
        </div>

        {/* Alternative Names */}
        {medicine.alternativeNames.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border/50">
            <p className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-secondary rounded-full" />
              Alternative Names
            </p>
            <div className="flex flex-wrap gap-2">
              {medicine.alternativeNames.slice(0, 6).map((alt, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-medium text-foreground hover:border-secondary/30 hover:shadow-sm transition-all"
                >
                  {alt}
                </span>
              ))}
              {medicine.alternativeNames.length > 6 && (
                <span className="px-3 py-1.5 text-xs text-muted-foreground font-medium">
                  +{medicine.alternativeNames.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Buy Links */}
        {medicine.buyLinks.length > 0 ? (
          <div>
            <h5 className="font-bold text-foreground mb-4 flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5 text-secondary" />
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
