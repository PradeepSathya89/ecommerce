import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import styles from './Products.module.css';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Best Discount' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || 'all';
  const [sort, setSort] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);

  const filtered = useMemo(() => {
    let list = catParam === 'all' ? products : products.filter(p => p.category === catParam);
    list = list.filter(p => p.price <= maxPrice);
    switch (sort) {
      case 'price-asc':  return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'discount':   return [...list].sort((a, b) => (b.mrp - b.price) - (a.mrp - a.price));
      case 'rating':     return [...list].sort((a, b) => b.rating - a.rating);
      default:           return [...list].sort((a, b) => b.reviews - a.reviews);
    }
  }, [catParam, sort, maxPrice]);

  const setCategory = (id) => {
    if (id === 'all') { searchParams.delete('cat'); setSearchParams(searchParams); }
    else { setSearchParams({ cat: id }); }
  };

  const activeCategory = categories.find(c => c.id === catParam);

  return (
    <main style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Page header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>
              {activeCategory ? `${activeCategory.emoji} ${activeCategory.name}` : '🛒 All Products'}
            </h1>
            <p className={styles.pageCount}>{filtered.length} products</p>
          </div>
          <div className={styles.controls}>
            <button className={styles.filterToggle} onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={16} /> Filters
            </button>
            <div className={styles.sortWrap}>
              <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} className={styles.sortIcon} />
            </div>
          </div>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarHeader}>
              <h3>Filters</h3>
              <button className={styles.closeSidebar} onClick={() => setShowFilters(false)}><X size={18} /></button>
            </div>

            <div className={styles.filterGroup}>
              <h4>Category</h4>
              <div className={styles.catList}>
                <button className={`${styles.catBtn} ${catParam === 'all' ? styles.catBtnActive : ''}`} onClick={() => setCategory('all')}>
                  🛒 All Products
                </button>
                {categories.map(c => (
                  <button key={c.id} className={`${styles.catBtn} ${catParam === c.id ? styles.catBtnActive : ''}`} onClick={() => setCategory(c.id)}>
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h4>Max Price: <span style={{ color: 'var(--pm-red)' }}>₹{maxPrice}</span></h4>
              <input
                type="range" min={20} max={500} step={10}
                value={maxPrice}
                onChange={e => setMaxPrice(+e.target.value)}
                className={styles.priceRange}
              />
              <div className={styles.priceLabels}><span>₹20</span><span>₹500</span></div>
            </div>
          </aside>

          {/* Product grid */}
          <div className={styles.gridWrap}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <span style={{ fontSize: 64 }}>🔍</span>
                <p>No products found. Try adjusting your filters.</p>
                <button onClick={() => { setCategory('all'); setMaxPrice(500); }} className={styles.resetBtn}>Reset Filters</button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
