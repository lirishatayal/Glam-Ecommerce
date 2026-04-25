import { useState } from 'react'
import StaticPageLayout from '../../components/common/StaticPageLayout'

const POSTS = [
  {
    id: 1,
    category: 'Skincare',
    tag: 'bg-pink-100 text-pink-700',
    title: '10 Skincare Ingredients You Should Use in Your 20s',
    excerpt: 'From retinol to niacinamide, here are the powerhouse ingredients that will transform your skin and why you should start using them now.',
    author: 'Priya Nair',
    authorRole: 'Beauty Editor',
    date: 'Apr 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80&fit=crop',
    featured: true,
  },
  {
    id: 2,
    category: 'Fashion',
    tag: 'bg-purple-100 text-purple-700',
    title: 'Summer 2026: The Colour Palette Taking Over Fashion Week',
    excerpt: 'Coral, terracotta, and electric blue dominated the runways this season. Here\'s how to wear these trends in everyday outfits.',
    author: 'Kavita Sharma',
    authorRole: 'Fashion Editor',
    date: 'Apr 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&fit=crop',
    featured: true,
  },
  {
    id: 3,
    category: 'Makeup',
    tag: 'bg-rose-100 text-rose-700',
    title: 'Dewy vs Matte: Which Finish Suits Your Skin Type?',
    excerpt: 'The eternal debate is over. We break down which foundation finish works best for oily, dry, combination, and sensitive skin.',
    author: 'Ananya Roy',
    authorRole: 'Makeup Artist',
    date: 'Apr 10, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80&fit=crop',
    featured: false,
  },
  {
    id: 4,
    category: 'Wellness',
    tag: 'bg-green-100 text-green-700',
    title: 'The 10-Minute Morning Routine That Changed Our Team\'s Skin',
    excerpt: 'Cleanser, toner, serum, moisturiser, SPF — in that order. We tested this exact routine for 30 days and the results were surprising.',
    author: 'Meera Joshi',
    authorRole: 'Wellness Writer',
    date: 'Apr 5, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80&fit=crop',
    featured: false,
  },
  {
    id: 5,
    category: 'Haircare',
    tag: 'bg-amber-100 text-amber-700',
    title: 'Olaplex vs Bond Repair: The Ultimate Hair Treatment Showdown',
    excerpt: 'We tested both treatments on damaged, colour-treated hair for 4 weeks. Here\'s our honest, unsponsored verdict.',
    author: 'Priya Nair',
    authorRole: 'Beauty Editor',
    date: 'Mar 28, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80&fit=crop',
    featured: false,
  },
  {
    id: 6,
    category: 'Jewellery',
    tag: 'bg-yellow-100 text-yellow-700',
    title: 'How to Layer Necklaces Like a Stylist (Without Getting Tangled)',
    excerpt: 'The chain-stacking trend is everywhere but doing it right requires knowing the golden rules of length, weight, and style mixing.',
    author: 'Kavita Sharma',
    authorRole: 'Fashion Editor',
    date: 'Mar 20, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&fit=crop',
    featured: false,
  },
]

const CATEGORIES = ['All', 'Skincare', 'Fashion', 'Makeup', 'Wellness', 'Haircare', 'Jewellery']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = POSTS.filter((p) => p.featured)
  const rest = POSTS.filter((p) => !p.featured)
  const filtered = activeCategory === 'All'
    ? rest
    : POSTS.filter((p) => !p.featured && p.category === activeCategory)

  return (
    <StaticPageLayout
      title="Glam Beauty Blog"
      subtitle="Expert tips, trend reports, and honest product reviews — written by beauty lovers, for beauty lovers."
      breadcrumb={[{ label: 'Blog' }]}
      heroColor="from-rose-50 to-pink-50"
    >
      {/* Featured posts */}
      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        {featured.map((post) => (
          <article key={post.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="relative overflow-hidden aspect-[16/9]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${post.tag}`}>
                {post.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 group-hover:text-pink-500 transition-colors mb-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="font-medium text-gray-600">{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>⏱ {post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              activeCategory === c ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-200 text-gray-600 hover:border-pink-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(activeCategory === 'All' ? rest : filtered).map((post) => (
          <article key={post.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
            <div className="relative overflow-hidden aspect-video">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${post.tag}`}>
                {post.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-pink-500 transition-colors text-sm mb-2 line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="font-medium text-gray-600">{post.author}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mt-12 bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl p-8 text-center text-white">
        <h3 className="text-xl font-bold mb-2">Never Miss a Beauty Tip</h3>
        <p className="text-white/80 text-sm mb-5">Get our weekly roundup of the best articles, delivered straight to your inbox.</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-sm mx-auto">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2.5 rounded-full text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-white" />
          <button type="submit" className="px-5 py-2.5 bg-white text-pink-600 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors whitespace-nowrap">Subscribe</button>
        </form>
      </div>
    </StaticPageLayout>
  )
}
