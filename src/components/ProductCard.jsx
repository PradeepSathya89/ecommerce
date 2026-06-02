import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getBadgeColor } from '../data/products';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { items, dispatch } = useCart();
  const [added, setAdded] = useState(false);
  const cartItem = items.find(i => i.id === product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const addToCart = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const inc = (e) => { e.preventDefault(); dispatch({ type: 'UPDATE_QTY', payload: { id: product.id, qty: cartItem.qty + 1 } }); };
  const dec = (e) => { e.preventDefault(); dispatch({ type: 'UPDATE_QTY', payload: { id: product.id, qty: cartItem.qty - 1 } }); };

  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      {discount > 0 && <div className={styles.discount}>-{discount}%</div>}
      {product.badge && (
        <div className={styles.badge} style={{ background: getBadgeColor(product.badge) }}>
          {product.badge}
        </div>
      )}
      <div className={styles.emojiWrap}>
        <span className={styles.emoji}>{product.emoji}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.unit}>{product.unit}</div>
        <div className={styles.rating}>
          <Star size={12} fill="#FFD600" stroke="none" />
          <span>{product.rating}</span>
          <span className={styles.reviews}>({product.reviews})</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price}</span>
          {product.mrp > product.price && <span className={styles.mrp}>₹{product.mrp}</span>}
        </div>
        {!cartItem ? (
          <button className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`} onClick={addToCart}>
            <ShoppingCart size={15} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        ) : (
          <div className={styles.qtyControl} onClick={e => e.preventDefault()}>
            <button className={styles.qtyBtn} onClick={dec}><Minus size={14} /></button>
            <span className={styles.qty}>{cartItem.qty}</span>
            <button className={styles.qtyBtn} onClick={inc}><Plus size={14} /></button>
          </div>
        )}
      </div>
    </Link>
  );
}
