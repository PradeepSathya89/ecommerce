import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import styles from './Home.module.css';

const HERO_SLIDES = [
  {
    headline: 'Fresh Groceries,\nDelivered Fast',
    sub: 'Farm-fresh fruits, veggies & daily essentials at the best prices in Hyderabad.',
    cta: 'Shop Now',
    bg: '#FFF3F3',
    accent: '#E8161A',
    emoji: '🥦🍅🥕',
  },
  {
    headline: 'Daily Dairy &\nEggs, Fresh Always',
    sub: 'Milk, paneer, butter, curd and eggs sourced fresh every morning.',
    cta: 'Explore Dairy',
    bg: '#FFFBEA',
    accent: '#E8A020',
    emoji: '🥛🧀🥚',
  },
  {
    headline: 'Premium Rice,\nAtta & Grains',
    sub: 'Basmati, Sona Masuri, whole wheat atta — everything for your kitchen.',
    cta: 'Shop Grains',
    bg: '#F0FFF4',
    accent: '#1DB954',
    emoji: '🌾🍚🫘',
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const bestsellers = products.filter(p => p.reviews > 200).slice(0, 8);
  const newArrivals = products.slice(-8);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const s = HERO_SLIDES[slide];

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero} style={{ background: s.bg }}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={styles.heroPill} style={{ color: s.accent, borderColor: s.accent }}>
              🎉 Free delivery above ₹499
            </span>
            <h1 className={styles.heroH1} key={slide} style={{ color: s.accent }}>
              {s.headline.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
            </h1>
            <p className={styles.heroSub}>{s.sub}</p>
            <div className={styles.heroCtas}>
              <Link to="/products" className={styles.heroBtnPrimary} style={{ background: s.accent }}>
                {s.cta} <ArrowRight size={18} />
              </Link>
              <Link to="/about" className={styles.heroBtnSecondary}>Learn More</Link>
            </div>
          </div>
          <div className={styles.heroEmoji} key={`e${slide}`}>
            {s.emoji}
          </div>
        </div>
        {/* Dots */}
        <div className={styles.heroDots}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`} style={{ background: i === slide ? s.accent : undefined }} onClick={() => setSlide(i)} />
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className={styles.trustBar}>
        <div className={`container ${styles.trustGrid}`}>
          <div className={styles.trustItem}><Truck size={24} className={styles.trustIcon} /><div><strong>Free Delivery</strong><span>On orders above ₹499</span></div></div>
          <div className={styles.trustItem}><ShieldCheck size={24} className={styles.trustIcon} /><div><strong>100% Fresh</strong><span>Quality guaranteed</span></div></div>
          <div className={styles.trustItem}><RotateCcw size={24} className={styles.trustIcon} /><div><strong>Easy Returns</strong><span>Hassle-free within 24h</span></div></div>
          <div className={styles.trustItem}><Headphones size={24} className={styles.trustIcon} /><div><strong>24/7 Support</strong><span>We're always here</span></div></div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
            <Link to="/products" className={styles.seeAll}>See all <ArrowRight size={16} /></Link>
          </div>
          <div className={styles.catGrid}>
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?cat=${cat.id}`} className={styles.catCard} style={{ '--cat-color': cat.color }}>
                <span className={styles.catEmoji}>{cat.emoji}</span>
                <span className={styles.catName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className={styles.section} style={{ background: 'var(--pm-bg-alt)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>🔥 Bestsellers</h2>
            <Link to="/products" className={styles.seeAll}>View all <ArrowRight size={16} /></Link>
          </div>
          <div className={styles.productGrid}>
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className="container">
          <div className={styles.banner}>
            <div>
              <h3 className={styles.bannerTitle}>Fresh from Local Farms 🌿</h3>
              <p>We partner with local farmers in Telangana to bring you the freshest produce, picked and delivered within 24 hours.</p>
              <Link to="/products?cat=fruits" className={styles.bannerBtn}>Explore Produce</Link>
            </div>
            <div className={styles.bannerEmoji}>🧑‍🌾🌱🚜</div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>✨ New Arrivals</h2>
            <Link to="/products" className={styles.seeAll}>View all <ArrowRight size={16} /></Link>
          </div>
          <div className={styles.productGrid}>
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section} style={{ background: 'var(--pm-bg-alt)' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: 40 }}>What Our Customers Say ❤️</h2>
          <div className={styles.testimonialGrid}>
            {[
              { name: 'Priya Sharma', loc: 'Kondapur', text: 'Absolutely love the freshness! My veggies arrived so crisp and the packaging was eco-friendly. Will definitely order again.', stars: 5 },
              { name: 'Arjun Reddy', loc: 'Gachibowli', text: 'Prices are unbeatable and delivery is super fast. Got my order within 2 hours. Peoples Mart is my go-to for groceries now!', stars: 5 },
              { name: 'Meena Kumari', loc: 'KPHB Colony', text: 'The Amul ghee and Basmati rice quality is top-notch. Customer service was also very helpful when I had a query.', stars: 4 },
            ].map((t, i) => (
              <div key={i} className={styles.testimonial}>
                <div className={styles.testimonialStars}>
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={16} fill="#FFD600" stroke="none" />)}
                </div>
                <p>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.name[0]}</div>
                  <div><strong>{t.name}</strong><span>{t.loc}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
