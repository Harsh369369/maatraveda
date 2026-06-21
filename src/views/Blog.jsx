'use client';
import React from 'react';
import { Link } from '../utils/router-compat';
import { blogPosts } from '../services/blogData';
import { BookOpen, Calendar, Clock, User, ArrowRight, Sparkles } from 'lucide-react';

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-12">
      
      {/* Blog Heading / SEO H1 */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/5 border border-forest/10">
          <BookOpen className="h-4 w-4 text-gold fill-gold/25" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-forest">Learn Ayurveda</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-forest">
          The Matriveda Wellness Wisdom
        </h1>
        <p className="font-sans text-sm sm:text-base text-charcoal/70 leading-relaxed">
          Unlock the secrets of ancient Ayurvedic texts. Explore guides on tridoshas, daily Dinacharya rituals, clean botanical ingredients, and holistic self-care recipes written by traditional Vaidyas.
        </p>
      </div>

      {/* Featured Top Article Banner */}
      {blogPosts.length > 0 && (
        <div className="bg-sandstone/30 border border-forest/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 text-left">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-video lg:aspect-auto lg:h-80 bg-cream-dark/20 shadow-inner">
            <img 
              src={blogPosts[0].featuredImage} 
              alt={blogPosts[0].title}
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-sans font-black bg-gold text-forest px-3 py-1.5 rounded-full uppercase tracking-wider">
              ★ Featured Article
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-forest leading-snug hover:text-leaf transition-colors">
              <Link to={`/blog/${blogPosts[0].slug}`}>{blogPosts[0].title}</Link>
            </h2>
            <p className="font-sans text-sm text-charcoal/75 leading-relaxed line-clamp-3">
              {blogPosts[0].excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/50 border-t border-forest/5 pt-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-gold" />
                <span>{blogPosts[0].date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-gold" />
                <span>{blogPosts[0].readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-gold" />
                <span>{blogPosts[0].author}</span>
              </div>
            </div>
            <Link 
              to={`/blog/${blogPosts[0].slug}`}
              className="inline-flex items-center gap-2 bg-forest text-cream hover:bg-leaf font-sans text-xs font-bold py-3.5 px-6 rounded-lg shadow-sm transition-all duration-300 uppercase tracking-widest"
            >
              Read Full Article <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* 3-Column Articles Grid */}
      <div className="space-y-8">
        <h3 className="font-serif text-2xl font-bold text-forest text-left flex items-center gap-2 border-b border-forest/10 pb-3">
          <Sparkles className="h-5 w-5 text-gold fill-gold/15" /> Ancient Remedies & Self-Care
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {blogPosts.slice(1).map((post) => (
            <article 
              key={post.slug}
              className="group bg-cream border border-forest/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full herbal-card-glow"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden bg-cream-dark/20 shrink-0 relative">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute bottom-3 left-3 text-[10px] font-sans font-bold bg-cream/90 backdrop-blur-sm text-forest px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm border border-forest/5">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-forest group-hover:text-leaf transition-colors line-clamp-2 leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-charcoal/70 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-forest/5">
                  {/* Meta row */}
                  <div className="flex justify-between items-center text-[10px] text-charcoal/50 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gold" /> {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="w-full bg-cream-dark/30 hover:bg-forest hover:text-cream border border-forest/10 font-sans text-xs font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    Read Ritual <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Blog;
