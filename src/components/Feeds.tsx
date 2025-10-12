import React, { useEffect } from "react";

const videos = [
  { title: "Node.js Crash Course", url: "https://www.youtube.com/embed/fBNz5xF-Kx4" },
  { title: "NestJS Full Course", url: "https://www.youtube.com/embed/wqhNoDE6pb4" },
  { title: "PostgreSQL Tutorial", url: "https://www.youtube.com/embed/qw--VYLpxG4" },
  { title: "Docker for Beginners", url: "https://www.youtube.com/embed/fqMOX6JJhGo" },
  { title: "Kubernetes Crash Course", url: "https://www.youtube.com/embed/X48VuDVv0do" },
  { title: "Redis Crash Course", url: "https://www.youtube.com/embed/G1rOthIU-uo" },
  { title: "GraphQL Tutorial", url: "https://www.youtube.com/embed/Y0lDGjwRYKw" },
  { title: "WebSockets in Node.js", url: "https://www.youtube.com/embed/ZKEqqIO7n-k" },
  { title: "JWT Authentication", url: "https://www.youtube.com/embed/SnoAwLP1a-0" },
  { title: "Microservices Explained", url: "https://www.youtube.com/embed/j2r2nDhTzO4" },
  { title: "Kafka for Beginners", url: "https://www.youtube.com/embed/8h7zjQvYf9E" },
  { title: "BullMQ Queue Tutorial", url: "https://www.youtube.com/embed/ZHYV_qPzWqA" },
  { title: "Helmet.js Security", url: "https://www.youtube.com/embed/qsDvJrGMSUY" },
  { title: "NestJS Authentication", url: "https://www.youtube.com/embed/n4yy5W4H2z0" },
  { title: "TypeORM Basics", url: "https://www.youtube.com/embed/W-qW8D_HXb4" },
  { title: "Real-time Chat with Socket.io", url: "https://www.youtube.com/embed/tHbCkikFfDE" },
  { title: "Express.js Tutorial", url: "https://www.youtube.com/embed/L72fhGm1tfE" },
  { title: "API Documentation with Swagger", url: "https://www.youtube.com/embed/pYXa4o0wzj4" },
  { title: "Server-Side Rendering Explained", url: "https://www.youtube.com/embed/8ZrO1D9CJ14" },
  { title: "Prometheus & Grafana Monitoring", url: "https://www.youtube.com/embed/h4Sl21AKiDg" },
];

export const Feeds: React.FC = () => {
  // Load Google Ads script dynamically
  useEffect(() => {
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1888814360460028";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    const interval = setInterval(() => {
      if ((window as any).adsbygoogle) {
        try {
          (window as any).adsbygoogle.push({});
        } catch (e) {
          console.error("Ads error", e);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎥 Developer Video Feed</h1>
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {videos.map((video, index) => (
          <React.Fragment key={index}>
            {/* Video Card */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{video.title}</h2>
              </div>
            </div>

            {/* Show ad after every 5 videos */}
            {(index + 1) % 5 === 0 && (
              <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex justify-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-1888814360460028"
                       data-ad-layout-key="-6t+ed+2i-1n-4w"
     data-ad-format="fluid"

                  data-ad-slot="9066315381" // ⚠️ Replace with your actual AdSense slot ID
                  data-full-width-responsive="true"
                ></ins>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};


/**
 * <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1888814360460028"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-6t+ed+2i-1n-4w"
     data-ad-client="ca-pub-1888814360460028"
     data-ad-slot="9066315381"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
 */