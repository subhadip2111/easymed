// src/pages/BlogPage.tsx
import React from "react";
import { InArticleAd } from "../components/InArticleAd";

const blogs = [
  {
    title: "Understanding Node.js Clustering",
    content:
      "Node.js clustering allows you to utilize multiple CPU cores to handle more requests efficiently.",
  },
  {
    title: "Mastering NestJS for Scalable Backends",
    content:
      "NestJS provides an opinionated architecture that simplifies development of enterprise-grade applications.",
  },
  {
    title: "Optimizing Database Performance in PostgreSQL",
    content:
      "Learn how to analyze query plans and optimize indexes for faster performance.",
  },
  {
    title: "Implementing Caching with Redis",
    content:
      "Redis caching can drastically improve your application's performance and scalability.",
  },
  {
    title: "Building REST APIs with Express.js",
    content:
      "Express.js provides a simple yet powerful way to build fast and secure REST APIs.",
  },
  {
    title: "Introduction to GraphQL",
    content:
      "GraphQL allows clients to request only the data they need, improving efficiency and flexibility.",
  },
  {
    title: "Using Docker for Backend Development",
    content:
      "Docker helps containerize your applications, making them portable and easy to deploy.",
  },
  {
    title: "Scaling Applications with Kubernetes",
    content:
      "Kubernetes automates deployment, scaling, and management of containerized applications.",
  },
  {
    title: "Understanding TypeORM in NestJS",
    content:
      "TypeORM integrates seamlessly with NestJS, making database operations structured and efficient.",
  },
  {
    title: "Authentication with JWT in Node.js",
    content:
      "JWT provides a stateless and secure way to handle user authentication and authorization.",
  },
  {
    title: "Real-time Apps with WebSockets",
    content:
      "WebSockets enable full-duplex communication between clients and servers for real-time features.",
  },
  {
    title: "Implementing Role-Based Access Control",
    content:
      "RBAC helps you secure your application by controlling who can access what.",
  },
  {
    title: "Using BullMQ for Background Jobs",
    content:
      "BullMQ is a fast and robust queue system for handling background processing in Node.js.",
  },
  {
    title: "Securing APIs with Helmet",
    content:
      "Helmet helps secure your Express applications by setting various HTTP headers.",
  },
  {
    title: "Deploying Node.js Apps on AWS",
    content:
      "Learn how to deploy and scale your Node.js applications on AWS EC2 with ease.",
  },
  {
    title: "Introduction to Server-Side Rendering",
    content:
      "SSR improves performance and SEO by rendering HTML on the server before sending it to the client.",
  },
  {
    title: "Monitoring Apps with Prometheus and Grafana",
    content:
      "Prometheus and Grafana provide powerful tools to monitor and visualize application metrics.",
  },
  {
    title: "Message Queues with Kafka",
    content:
      "Kafka is a distributed streaming platform used to build real-time data pipelines and apps.",
  },
  {
    title: "Building Microservices Architecture",
    content:
      "Microservices architecture allows building scalable and maintainable applications through independent services.",
  },
  {
    title: "Best Practices for API Documentation",
    content:
      "Clear and structured API documentation helps developers integrate faster and reduces confusion.",
  },
];


export const BlogPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Articles</h1>

      {blogs.map((blog, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-gray-700 leading-relaxed">{blog.content}</p>

          {/* Add In-Article Ad after each article except last */}
          {index < blogs.length - 1 && (
            <InArticleAd slot="5324287599" /> 
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
