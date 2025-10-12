import React from "react";

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
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">🎥 Developer Video Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition-transform"
          >
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
            <div className="p-3">
              <h2 className="text-lg font-semibold">{video.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
