// src/components/InArticleAd.tsx
import { useEffect } from "react";

interface InArticleAdProps {
    slot: string; // Replace this later with your ad slot ID from AdSense
}

export const InArticleAd: React.FC<InArticleAdProps> = ({ slot }) => {
    useEffect(() => {
        try {
            if (window.adsbygoogle && typeof window.adsbygoogle.push === "function") {
                window.adsbygoogle.push({});
            }
        } catch (err) {
            console.error("AdSense InArticleAd error:", err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{
                display: "block",
                textAlign: "center",
                margin: "24px 0",
            }}
            data-ad-client="ca-pub-1888814360460028" //
            data-ad-slot={slot}
            data-ad-layout="in-article"

            data-ad-format="fluid"
            data-ad-layout-key="-fb+5w+4e-db+86"
        />
    );
};
