import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Minus, ArrowLeft, Truck, ShieldCheck, RotateCcw, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, getBadgeColor } from '../data/products';
import ProductCard from '../components/ProductCard';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === +id);
  const { items, dispatch } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <p style={{ fontSize: 20 }}>Product not found.</p>
      <Link to="/products" style={{ color: 'var(--pm-red)', fontWeight: 700 }}>← Back to Products</Link>
    </div>
  );

  const cartItem = items.find(i => i.id === product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const addToCart = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const goToCart = () => {
    addToCart();
    navigate('/cart');
  };

  return (
    <main style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?cat=${product.category}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className={styles.layout}>
          {/* Image panel */}
          <div className={styles.imgPanel}>
            <div className={styles.imgBox}>
              {discount > 0 && <div className={styles.discountTag}>-{discount}% OFF</div>}
              <span className={styles.productEmoji}>{product.emoji}</span>
            </div>
            {product.badge && (
              <div className={styles.badgeBox} style={{ background: getBadgeColor(product.badge) }}>
                {product.badge}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className={styles.infoPanel}>
            <h1 className={styles.productName}>{product.name}</h1>

            <div className={styles.metaRow}>
              <div className={styles.ratingBox}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#FFD600' : 'none'} stroke={i < Math.floor(product.rating) ? 'none' : '#ccc'} />
                ))}
                <span className={styles.ratingNum}>{product.rating}</span>
                <span className={styles.reviewCount}>({product.reviews} reviews)</span>
              </div>
              <button className={styles.shareBtn}><Share2 size={16} /> Share</button>
            </div>

            <div className={styles.priceBox}>
              <span className={styles.price}>₹{product.price}</span>
              {product.mrp > product.price && (
                <>
                  <span className={styles.mrp}>₹{product.mrp}</span>
                  <span className={styles.saving}>Save ₹{product.mrp - product.price}</span>
                </>
              )}
            </div>

            <div className={styles.unitBox}>
              <span className={styles.unitLabel}>Pack size:</span>
              <span className={styles.unitValue}>{product.unit}</span>
            </div>

            <div className={styles.stockBadge}>
              {product.stock > 10 ? '✅ In Stock' : product.stock > 0 ? `⚠️ Only ${product.stock} left!` : '❌ Out of Stock'}
            </div>

            {/* Qty selector + buttons */}
            <div className={styles.addSection}>
              <div className={styles.qtyRow}>
                <span className={styles.qtyLabel}>Qty:</span>
                <div className={styles.qtyControl}>
                  <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                  <span className={styles.qtyNum}>{qty}</span>
                  <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}><Plus size={16} /></button>
                </div>
              </div>
              <div className={styles.btnRow}>
                <button className={styles.addCartBtn} onClick={addToCart}>
                  <ShoppingCart size={18} />
                  {cartItem ? `Add More (${cartItem.qty} in cart)` : 'Add to Cart'}
                </button>
                <button className={styles.buyNowBtn} onClick={goToCart}>
                  Buy Now
                </button>
              </div>
            </div>

            {/* Promises */}
            <div className={styles.promises}>
              <div className={styles.promise}><Truck size={18} className={styles.promiseIcon} /><div><strong>Free Delivery</strong><span>On orders above ₹499</span></div></div>
              <div className={styles.promise}><ShieldCheck size={18} className={styles.promiseIcon} /><div><strong>Quality Assured</strong><span>100% authentic products</span></div></div>
              <div className={styles.promise}><RotateCcw size={18} className={styles.promiseIcon} /><div><strong>Easy Returns</strong><span>Within 24 hours</span></div></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {['description', 'details', 'reviews'].map(tab => (
            <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <div>
              <p>Experience the finest quality <strong>{product.name}</strong> delivered fresh to your doorstep. Sourced from trusted suppliers and local farmers, ensuring you get the best nutritional value and taste in every purchase.</p>
              <p style={{ marginTop: 16 }}>Perfect for everyday cooking, our {product.name} is carefully selected and packed to maintain freshness. Ideal for families who value quality and convenience.</p>
            </div>
          )}
          {activeTab === 'details' && (
            <table className={styles.detailTable}>
              <tbody>
                <tr><td>Product Name</td><td>{product.name}</td></tr>
                <tr><td>Net Weight / Quantity</td><td>{product.unit}</td></tr>
                <tr><td>Category</td><td style={{ textTransform: 'capitalize' }}>{product.category}</td></tr>
                <tr><td>MRP</td><td>₹{product.mrp}</td></tr>
                <tr><td>Our Price</td><td>₹{product.price}</td></tr>
                <tr><td>You Save</td><td style={{ color: 'var(--pm-green)', fontWeight: 700 }}>₹{product.mrp - product.price} ({discount}%)</td></tr>
                <tr><td>Stock Available</td><td>{product.stock} units</td></tr>
                <tr><td>Rating</td><td>⭐ {product.rating} ({product.reviews} reviews)</td></tr>
              </tbody>
            </table>
          )}
          {activeTab === 'reviews' && (
            <div className={styles.reviewsList}>
              {[
                { name: 'Ravi K.', stars: 5, text: 'Excellent quality! Delivered fresh and well-packed. Highly recommend.' },
                { name: 'Sunita M.', stars: 4, text: 'Good value for money. Will buy again from Peoples Mart.' },
                { name: 'Anil T.', stars: 5, text: 'Fresh product, fast delivery. Exactly as described.' },
              ].map((r, i) => (
                <div key={i} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}>{r.name[0]}</div>
                    <div>
                      <strong>{r.name}</strong>
                      <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                        {Array.from({ length: r.stars }).map((_, j) => <Star key={j} size={13} fill="#FFD600" stroke="none" />)}
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewText}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 className={styles.relatedTitle}>Related Products</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
