import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';

export default function Cart() {
  const { items, dispatch, subtotal, savings, totalItems } = useCart();
  const navigate = useNavigate();
  const delivery = subtotal >= 499 ? 0 : 49;
  const total = subtotal + delivery;

  if (items.length === 0) return (
    <main className={styles.emptyWrap}>
      <div className={styles.emptyBox}>
        <span className={styles.emptyEmoji}>🛒</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet. Explore our fresh products!</p>
        <Link to="/products" className={styles.shopBtn}>Start Shopping</Link>
      </div>
    </main>
  );

  return (
    <main style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <h1 className={styles.pageTitle}>Your Cart <span>({totalItems} items)</span></h1>
        <div className={styles.layout}>
          {/* Cart items */}
          <div className={styles.itemsList}>
            {items.map(item => {
              const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);
              return (
                <div key={item.id} className={styles.cartItem}>
                  <Link to={`/product/${item.id}`} className={styles.itemEmoji}>{item.emoji}</Link>
                  <div className={styles.itemInfo}>
                    <Link to={`/product/${item.id}`} className={styles.itemName}>{item.name}</Link>
                    <div className={styles.itemMeta}>
                      <span className={styles.itemUnit}>{item.unit}</span>
                      {discount > 0 && <span className={styles.itemDiscount}>-{discount}%</span>}
                    </div>
                    <div className={styles.itemPriceRow}>
                      <span className={styles.itemPrice}>₹{item.price}</span>
                      {item.mrp > item.price && <span className={styles.itemMrp}>₹{item.mrp}</span>}
                    </div>
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.qtyControl}>
                      <button className={styles.qtyBtn} onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty - 1 } })}><Minus size={14} /></button>
                      <span className={styles.qtyNum}>{item.qty}</span>
                      <button className={styles.qtyBtn} onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty + 1 } })}><Plus size={14} /></button>
                    </div>
                    <div className={styles.itemTotal}>₹{item.price * item.qty}</div>
                    <button className={styles.removeBtn} onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}><Trash2 size={16} /></button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>

            {savings > 0 && (
              <div className={styles.savingBanner}>
                <Tag size={15} />
                <span>You're saving <strong>₹{savings}</strong> on this order!</span>
              </div>
            )}

            <div className={styles.summaryLines}>
              <div className={styles.summaryLine}><span>Subtotal ({totalItems} items)</span><span>₹{subtotal}</span></div>
              <div className={styles.summaryLine}><span>Delivery</span><span style={{ color: delivery === 0 ? 'var(--pm-green)' : 'inherit' }}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
              {delivery > 0 && <div className={styles.deliveryNote}>Add ₹{499 - subtotal} more for free delivery</div>}
              {savings > 0 && <div className={styles.summaryLine} style={{ color: 'var(--pm-green)' }}><span>Savings</span><span>-₹{savings}</span></div>}
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className={styles.checkoutBtn} onClick={() => navigate('/checkout')}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <Link to="/products" className={styles.continueShopping}>
              <ShoppingBag size={15} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
