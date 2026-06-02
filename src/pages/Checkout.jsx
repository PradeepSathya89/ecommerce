import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Smartphone, Banknote, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './Checkout.module.css';

const STEPS = ['Delivery', 'Payment', 'Confirm'];

export default function Checkout() {
  const { items, subtotal, savings, dispatch } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [payMethod, setPayMethod] = useState('upi');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: 'Hyderabad', state: 'Telangana', pincode: '', upiId: '', cardNum: '', cardExp: '', cardCvv: '', cardName: '' });
  const [errors, setErrors] = useState({});

  const delivery = subtotal >= 499 ? 0 : 49;
  const total = subtotal + delivery;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number';
    if (!form.email.includes('@')) e.email = 'Enter valid email';
    if (!form.address.trim()) e.address = 'Required';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    if (payMethod === 'upi' && !form.upiId.includes('@')) e.upiId = 'Enter valid UPI ID (e.g. name@upi)';
    if (payMethod === 'card') {
      if (form.cardNum.replace(/\s/g, '').length !== 16) e.cardNum = 'Enter 16-digit card number';
      if (!form.cardExp) e.cardExp = 'Required';
      if (form.cardCvv.length !== 3) e.cardCvv = 'Enter 3-digit CVV';
      if (!form.cardName.trim()) e.cardName = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validate()) return;
    if (step === 1 && payMethod !== 'cod' && !validatePayment()) return;
    if (step === 2) { placeOrder(); return; }
    setStep(s => s + 1);
  };

  const placeOrder = () => {
    dispatch({ type: 'CLEAR_CART' });
    setOrderPlaced(true);
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (orderPlaced) return (
    <main className={styles.successWrap}>
      <div className={styles.successBox}>
        <CheckCircle2 size={72} className={styles.successIcon} />
        <h2>Order Placed Successfully! 🎉</h2>
        <p>Thank you for shopping with Peoples Mart. Your order will be delivered within <strong>2–4 hours</strong>.</p>
        <div className={styles.orderNum}>Order #PM{Date.now().toString().slice(-6)}</div>
        <p className={styles.smsNote}>A confirmation has been sent to <strong>{form.phone}</strong></p>
        <button className={styles.homeBtn} onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </main>
  );

  if (items.length === 0) { navigate('/cart'); return null; }

  return (
    <main style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <h1 className={styles.pageTitle}>Checkout</h1>

        {/* Steps */}
        <div className={styles.stepper}>
          {STEPS.map((s, i) => (
            <div key={s} className={`${styles.stepItem} ${i <= step ? styles.stepActive : ''}`}>
              <div className={styles.stepCircle}>{i < step ? '✓' : i + 1}</div>
              <span className={styles.stepLabel}>{s}</span>
              {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />}
            </div>
          ))}
        </div>

        <div className={styles.layout}>
          <div className={styles.formArea}>
            {/* Step 0: Delivery */}
            {step === 0 && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>📍 Delivery Details</h3>
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label>Full Name *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" className={errors.name ? styles.inputError : ''} />
                    {errors.name && <span className={styles.err}>{errors.name}</span>}
                  </div>
                  <div className={styles.field}>
                    <label>Phone Number *</label>
                    <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="10-digit mobile number" maxLength={10} className={errors.phone ? styles.inputError : ''} />
                    {errors.phone && <span className={styles.err}>{errors.phone}</span>}
                  </div>
                  <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label>Email Address *</label>
                    <input value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" className={errors.email ? styles.inputError : ''} />
                    {errors.email && <span className={styles.err}>{errors.email}</span>}
                  </div>
                  <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label>Delivery Address *</label>
                    <textarea value={form.address} onChange={e => set('address', e.target.value)} placeholder="Flat/Door no, Street, Landmark" rows={3} className={errors.address ? styles.inputError : ''} />
                    {errors.address && <span className={styles.err}>{errors.address}</span>}
                  </div>
                  <div className={styles.field}>
                    <label>City</label>
                    <input value={form.city} readOnly className={styles.readOnly} />
                  </div>
                  <div className={styles.field}>
                    <label>State</label>
                    <input value={form.state} readOnly className={styles.readOnly} />
                  </div>
                  <div className={styles.field}>
                    <label>Pincode *</label>
                    <input value={form.pincode} onChange={e => set('pincode', e.target.value)} placeholder="500000" maxLength={6} className={errors.pincode ? styles.inputError : ''} />
                    {errors.pincode && <span className={styles.err}>{errors.pincode}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>💳 Payment Method</h3>
                <div className={styles.payMethods}>
                  {[
                    { id: 'upi', icon: <Smartphone size={20} />, label: 'UPI', sub: 'Pay via UPI ID or QR' },
                    { id: 'card', icon: <CreditCard size={20} />, label: 'Card', sub: 'Debit / Credit Card' },
                    { id: 'cod', icon: <Banknote size={20} />, label: 'Cash on Delivery', sub: 'Pay when you receive' },
                  ].map(pm => (
                    <div key={pm.id} className={`${styles.payMethod} ${payMethod === pm.id ? styles.payMethodActive : ''}`} onClick={() => setPayMethod(pm.id)}>
                      <div className={styles.payIcon}>{pm.icon}</div>
                      <div><strong>{pm.label}</strong><span>{pm.sub}</span></div>
                      <div className={styles.payRadio}>{payMethod === pm.id && <div className={styles.payRadioInner} />}</div>
                    </div>
                  ))}
                </div>

                {payMethod === 'upi' && (
                  <div className={styles.payDetails}>
                    <div className={styles.field}>
                      <label>UPI ID *</label>
                      <input value={form.upiId} onChange={e => set('upiId', e.target.value)} placeholder="yourname@upi" className={errors.upiId ? styles.inputError : ''} />
                      {errors.upiId && <span className={styles.err}>{errors.upiId}</span>}
                    </div>
                    <div className={styles.upiNote}>
                      <ShieldCheck size={14} /> Secured by 256-bit SSL encryption
                    </div>
                  </div>
                )}

                {payMethod === 'card' && (
                  <div className={styles.payDetails}>
                    <div className={styles.formGrid}>
                      <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label>Card Number *</label>
                        <input value={form.cardNum} onChange={e => set('cardNum', e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim())} placeholder="1234 5678 9012 3456" maxLength={19} className={errors.cardNum ? styles.inputError : ''} />
                        {errors.cardNum && <span className={styles.err}>{errors.cardNum}</span>}
                      </div>
                      <div className={styles.field}>
                        <label>Expiry (MM/YY) *</label>
                        <input value={form.cardExp} onChange={e => set('cardExp', e.target.value)} placeholder="MM/YY" maxLength={5} className={errors.cardExp ? styles.inputError : ''} />
                        {errors.cardExp && <span className={styles.err}>{errors.cardExp}</span>}
                      </div>
                      <div className={styles.field}>
                        <label>CVV *</label>
                        <input value={form.cardCvv} onChange={e => set('cardCvv', e.target.value.replace(/\D/,''))} placeholder="123" maxLength={3} type="password" className={errors.cardCvv ? styles.inputError : ''} />
                        {errors.cardCvv && <span className={styles.err}>{errors.cardCvv}</span>}
                      </div>
                      <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label>Name on Card *</label>
                        <input value={form.cardName} onChange={e => set('cardName', e.target.value)} placeholder="As on card" className={errors.cardName ? styles.inputError : ''} />
                        {errors.cardName && <span className={styles.err}>{errors.cardName}</span>}
                      </div>
                    </div>
                    <div className={styles.upiNote}><ShieldCheck size={14} /> Secured by 256-bit SSL encryption</div>
                  </div>
                )}

                {payMethod === 'cod' && (
                  <div className={styles.codNote}>
                    <Banknote size={18} />
                    <span>Keep exact change ready. Our delivery partner will collect ₹{total} at the time of delivery.</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Confirm */}
            {step === 2 && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>✅ Confirm Your Order</h3>
                <div className={styles.confirmSection}>
                  <h4>Delivery To</h4>
                  <p>{form.name} · {form.phone}</p>
                  <p>{form.address}, {form.city}, {form.state} – {form.pincode}</p>
                </div>
                <div className={styles.confirmSection}>
                  <h4>Payment</h4>
                  <p style={{ textTransform: 'capitalize' }}>{payMethod === 'cod' ? 'Cash on Delivery' : payMethod === 'card' ? `Card ending ****${form.cardNum.slice(-4)}` : `UPI: ${form.upiId}`}</p>
                </div>
                <div className={styles.confirmItems}>
                  {items.map(item => (
                    <div key={item.id} className={styles.confirmItem}>
                      <span>{item.emoji} {item.name} × {item.qty}</span>
                      <span>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.navBtns}>
              {step > 0 && <button className={styles.backBtn} onClick={() => setStep(s => s - 1)}>← Back</button>}
              <button className={styles.nextBtn} onClick={next}>
                {step === 2 ? '🎉 Place Order' : step === 1 ? 'Review Order →' : 'Proceed to Payment →'}
              </button>
            </div>
          </div>

          {/* Order summary side */}
          <div className={styles.summaryCard}>
            <h3 className={styles.cardTitle}>Order Summary</h3>
            <div className={styles.summaryItems}>
              {items.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <span className={styles.sItemEmoji}>{item.emoji}</span>
                  <span className={styles.sItemName}>{item.name}</span>
                  <span className={styles.sItemQty}>×{item.qty}</span>
                  <span className={styles.sItemPrice}>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className={styles.summaryLines}>
              <div className={styles.summaryLine}><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className={styles.summaryLine}><span>Delivery</span><span style={{ color: delivery === 0 ? 'var(--pm-green)' : 'inherit' }}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
              {savings > 0 && <div className={styles.summaryLine} style={{ color: 'var(--pm-green)' }}><span>You Save</span><span>-₹{savings}</span></div>}
            </div>
            <div className={styles.summaryTotal}><span>Total</span><span>₹{total}</span></div>
            <div className={styles.secureNote}><ShieldCheck size={14} /> 100% Secure Checkout</div>
          </div>
        </div>
      </div>
    </main>
  );
}
