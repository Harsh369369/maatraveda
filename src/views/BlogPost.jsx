'use client';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from '../utils/router-compat';
import { blogPosts } from '../services/blogData';
import { productServices } from '../services/api';
import { ArrowLeft, Calendar, Clock, User, Share2, Link2, Sparkles, MessageCircle, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [crossSellProducts, setCrossSellProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Find the post based on URL slug
  useEffect(() => {
    const currentPost = blogPosts.find((p) => p.slug === slug);
    if (currentPost) {
      setPost(currentPost);
      // Set page document title for SEO
      document.title = `${currentPost.title} | Matriveda Ayurveda`;
    }
    return () => {
      document.title = 'Matriveda | Ancient Wisdom, Modern Rituals';
    };
  }, [slug]);

  // Fetch cross-sell products based on article related category
  useEffect(() => {
    if (post && post.relatedProductCategory) {
      const fetchCrossSells = async () => {
        setLoadingProducts(true);
        try {
          const response = await productServices.getAllProducts(post.relatedProductCategory);
          if (response.success) {
            // Pick up to 2 items
            const filtered = response.products.filter(p => !p.isComingSoon).slice(0, 2);
            setCrossSellProducts(filtered);
          }
        } catch (err) {
          console.error('Failed to load related products for blog:', err);
        } finally {
          setLoadingProducts(false);
        }
      };
      fetchCrossSells();
    }
  }, [post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this incredible Ayurvedic guide: "${post.title}" -> ${window.location.href}`)}`;
    window.open(shareUrl, '_blank');
  };

  if (!post) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h3 className="font-serif font-bold text-forest text-lg">Article not found</h3>
        <p className="text-sm text-charcoal/50">The wisdom guide you followed might have moved.</p>
        <Link to="/blog" className="inline-block bg-forest text-cream font-bold py-2 px-6 rounded-lg hover:bg-leaf">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Related articles (2 items other than current one)
  const relatedArticles = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 space-y-8 text-left">
      
      {/* 1. Back button */}
      <div>
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-leaf transition-colors font-sans"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Wisdom Blog
        </Link>
      </div>

      {/* 2. Main Article Title Header */}
      <header className="space-y-4 max-w-4xl border-b border-forest/10 pb-6">
        <span className="inline-flex items-center gap-1 text-[10px] font-sans font-black bg-gold text-forest px-3 py-1.5 rounded-full uppercase tracking-wider">
          🌿 {post.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-forest leading-tight">
          {post.title}
        </h1>
        
        {/* Author Meta Row */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-charcoal/50 pt-2">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-gold" />
            <span className="font-semibold text-charcoal/80">{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gold" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-gold" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* 3. Article Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Article Content Body (8 columns) */}
        <article className="lg:col-span-8 space-y-8">
          
          {/* Main banner image */}
          <div className="rounded-3xl overflow-hidden aspect-video bg-cream-dark/20 shadow-inner border border-forest/10">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Social share widget */}
          <div className="flex items-center gap-3 p-4 bg-sandstone/25 border border-forest/10 rounded-2xl">
            <span className="font-sans text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="h-4 w-4" /> Share This Wisdom:
            </span>
            <div className="flex gap-2">
              <button 
                onClick={handleWhatsAppShare}
                className="p-2 rounded-full bg-cream hover:bg-forest hover:text-cream border border-forest/10 transition-all text-forest shadow-sm"
                title="Share on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
              </button>
              <button 
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-cream hover:bg-forest hover:text-cream border border-forest/10 transition-all text-forest shadow-sm"
                title="Copy Link"
              >
                <Link2 className="h-4 w-4" />
              </button>
            </div>
            {shareCopied && (
              <span className="font-sans text-[10px] font-bold text-forest animate-pulse ml-2">✓ Link Copied!</span>
            )}
          </div>

          {/* HTML Render Body */}
          <div className="font-sans text-sm sm:text-base text-charcoal/85 leading-relaxed space-y-6">
            {post.content.map((block, idx) => {
              if (block.type === 'heading2') {
                return (
                  <h2 key={idx} className="font-serif text-xl sm:text-2xl font-black text-forest pt-4">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'heading3') {
                return (
                  <h3 key={idx} className="font-serif text-lg sm:text-xl font-bold text-forest pt-2">
                    {block.text}
                  </h3>
                );
              }
              return (
                <p key={idx} className="leading-loose text-justify text-charcoal/80">
                  {block.text}
                </p>
              );
            })}
          </div>

        </article>

        {/* Right Side: Sticky Product Cross-sell Sidebar (4 columns) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
          
          <div className="bg-cream border border-forest/10 p-6 rounded-3xl shadow-sm space-y-6">
            <h4 className="font-serif text-base font-bold text-forest flex items-center gap-1.5 border-b border-forest/10 pb-3">
              <Sparkles className="h-4.5 w-4.5 text-gold fill-gold/15" /> Recommended Rituals
            </h4>
            
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Based on the Ayurvedic properties highlighted in this guide, these cold-pressed formulas will help balance your energies:
            </p>

            {loadingProducts ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-40 bg-cream-dark/20 rounded-xl border border-forest/5 animate-pulse"></div>
                ))}
              </div>
            ) : crossSellProducts.length === 0 ? (
              <div className="text-xs text-charcoal/50 text-center py-4">No recommended items found.</div>
            ) : (
              <div className="space-y-6">
                {crossSellProducts.map((p) => (
                  <div key={p._id} className="border border-forest/5 rounded-xl p-3.5 bg-sandstone/15 space-y-3">
                    <div className="flex gap-3">
                      <img 
                        src={p.images[0]} 
                        alt={p.name}
                        className="h-14 w-14 object-cover rounded-lg bg-cream border border-forest/10 shadow-sm shrink-0"
                      />
                      <div className="text-left space-y-0.5">
                        <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-forest/60">{p.category} care</span>
                        <h5 className="font-serif text-xs font-bold text-forest leading-tight line-clamp-2">{p.name}</h5>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-sans text-xs font-bold text-forest">₹{p.price}</span>
                          <span className="font-sans text-[10px] line-through text-charcoal/40">₹{p.mrp}</span>
                        </div>
                      </div>
                    </div>
                    <Link 
                      to={`/products/${p._id}`}
                      className="w-full bg-forest text-cream hover:bg-leaf text-[10px] font-sans font-black py-2.5 px-3 rounded-md transition-colors shadow-sm flex items-center justify-center gap-1 uppercase tracking-wider"
                    >
                      View Product Details <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

        </aside>

      </div>

      {/* 4. Related Articles Bottom Section */}
      <section className="border-t border-forest/10 pt-12 space-y-6">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest">You Might Also Like</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedArticles.map((article) => (
            <div 
              key={article.slug}
              className="flex flex-col sm:flex-row bg-cream border border-forest/5 hover:border-forest/15 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all gap-4 items-center"
            >
              <img 
                src={article.featuredImage} 
                alt={article.title}
                className="h-28 w-28 object-cover rounded-xl bg-cream-dark/20 shrink-0"
              />
              <div className="text-left space-y-2">
                <span className="text-[9px] font-sans font-bold bg-gold/15 text-forest px-2 py-0.5 rounded-md uppercase tracking-wider">{article.category}</span>
                <h4 className="font-serif text-base font-bold text-forest hover:text-leaf transition-colors line-clamp-2 leading-tight">
                  <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                </h4>
                <p className="text-xs text-charcoal/60 line-clamp-1">{article.excerpt}</p>
                <Link 
                  to={`/blog/${article.slug}`}
                  className="text-xs font-bold text-forest hover:text-leaf flex items-center gap-1 font-sans"
                >
                  Read Article <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default BlogPost;
