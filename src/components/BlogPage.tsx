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
