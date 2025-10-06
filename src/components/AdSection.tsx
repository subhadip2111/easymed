import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export const AdSection = () => {
  const ads = [
    {
      title: "Health Insurance Plans",
      description: "Get comprehensive coverage starting at just ₹500/month",
      link: "#",
    },
    {
      title: "Free Health Checkup",
      description: "Book your annual health checkup with our partner clinics",
      link: "#",
    },
  ];

  return (
    <div className="w-full bg-muted/30 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center">
          SPONSORED
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {ads.map((ad, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:shadow-medium transition-smooth bg-card"
            >
              <a href={ad.link} className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{ad.title}</h4>
                  <p className="text-sm text-muted-foreground">{ad.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
