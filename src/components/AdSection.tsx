import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const AdSection = () => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="adsbygoogle.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1888814360460028";
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      script.onload = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense error:", e);
        }
      };
    } else {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense render error:", e);
      }
    }
  }, []);

  return (
    <div className="w-full bg-muted/30 py-8 px-4 ">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1888814360460028"
        data-ad-slot="7785115193" 
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};
