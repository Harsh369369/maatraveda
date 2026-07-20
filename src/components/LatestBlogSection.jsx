import React from "react";
import { Link } from "../utils/router-compat";
import { ArrowRight } from "lucide-react";

const BLOG_POSTS = [
  {
    title: "Benefits of Ashwagandha for Stress & Anxiety",
    date: "June 12, 2026",
    readTime: "3 min read",
    image: "/images/blog_ashwagandha.jpg",
  },
  {
    title: "5 Ayurvedic Skincare Rituals for Glowing Skin",
    date: "June 8, 2026",
    readTime: "4 min read",
    image: "/images/blog_skincare.jpg",
  },
  {
    title: "How to Balance Vata, Pitta & Kapha Naturally",
    date: "June 3, 2026",
    readTime: "6 min read",
    image: "/images/blog_detox.jpg",
  },
];

export default function LatestBlogSection() {
  return (
    <section className="px-6 max-w-7xl mx-auto space-y-5 text-left select-none">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl font-black text-mv-dark-green">
          Latest from our Blog
        </h3>
        <Link
          to="/blog"
          className="text-xs font-bold text-[#5B7917] hover:underline flex items-center gap-1 cursor-pointer"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.title}
            className="bg-white border border-[#D8D5CD] rounded-2xl overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-cream border-b border-[#D8D5CD]/40">
                <img
                  src={post.image}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  alt={post.title}
                />
              </div>

              <div className="p-5 space-y-3">
                <span className="text-[9px] font-bold text-charcoal/40 uppercase tracking-wider block">
                  {post.date} &bull; {post.readTime}
                </span>
                <h4 className="font-serif text-sm font-black text-mv-dark-green group-hover:text-mv-olive transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h4>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2">
              <Link
                to="/blog"
                className="text-xs font-black text-mv-olive hover:text-mv-dark-green transition-colors inline-flex items-center gap-1 cursor-pointer uppercase tracking-wider"
              >
                Read More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
