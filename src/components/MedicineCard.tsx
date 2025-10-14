import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface BuyLink {
  site: string;
  title: string;
  url: string;
  price: string;
}

interface MedicineCardProps {
  name: string;
  composition?: string;
  buyLinks: BuyLink[];
  isSimilar?: boolean;
}

export const MedicineCard = ({ name, composition, buyLinks, isSimilar }: MedicineCardProps) => {
  return (
    <Card className="shadow-medium hover:shadow-strong transition-smooth">
      <CardHeader>
        <CardTitle className="text-xl">
          {name}
          {isSimilar && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">(Similar)</span>
          )}
        </CardTitle>
        {composition && (
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-semibold">Composition:</span> {composition}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Available at:</p>
          <div className="space-y-3">
            {buyLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{link.site}</p>
                  <p className="text-sm text-muted-foreground">{link.title}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-primary">{link.price}</span>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Buy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};