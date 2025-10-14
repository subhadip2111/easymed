import { ExternalLink } from "lucide-react";

interface BuyLink {
  site: string;
  title: string;
  url: string;
  snippet: string | null;
  price: string | null;
}

interface BuyLinkItemProps {
  link: BuyLink;
}

export function BuyLinkItem({ link }: BuyLinkItemProps) {
  const isAvailable = link.price !== "Not Available" && link.price !== "Not specified";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border-2 border-border rounded-xl hover:border-primary/40 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all group hover:shadow-md hover:-translate-x-1"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-primary text-base group-hover:text-secondary transition-colors">
              {link.site}
            </span>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-sm text-foreground font-medium truncate mb-2">{link.title}</p>
          {link.snippet && link.snippet !== "No current offer" && (
            <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-success/20 to-success/10 text-success-foreground text-xs rounded-lg font-semibold border border-success/30">
              {link.snippet}
            </span>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          {isAvailable ? (
            <span className="font-bold text-xl text-foreground block bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-2 rounded-lg border-2 border-primary/20">
              {link.price}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground font-medium px-3 py-1.5 bg-muted rounded-lg">
              {link.price}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
