import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <section className={styles.hero}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className={styles.heroTitle}>Get in Touch 👋</h1>
          <p className={styles.heroSub}>Have a question, feedback, or need help with an order? We're always here for you.</p>
        </div>
      </section>

      <section style={{ padding: '64px 0 80px' }}>
        <div className="container">
          <div className={styles.layout}>
            {/* Contact info */}
            <div className={styles.infoCol}>
              <h2 className={styles.infoTitle}>Contact Information</h2>
              <p className={styles.infoSub}>Reach us through any of the channels below, or fill in the form and we'll get back to you within 2 hours.</p>

              <div className={styles.infoList}>
                {[
                  { icon: <MapPin size={20} />, label: 'Our Store', value: 'Plot 42, Kondapur, Hyderabad – 500084, Telangana' },
                  { icon: <Phone size={20} />, label: 'Phone', value: '+91 98765 43210' },
                  { icon: <Mail size={20} />, label: 'Email', value: 'hello@peoplesmart.in' },
                  { icon: <Clock size={20} />, label: 'Store Hours', value: 'Mon–Sat: 8 AM – 9 PM | Sun: 9 AM – 7 PM' },
                ].map((item, i) => (
                  <div key={i} className={styles.infoItem}>
                    <div className={styles.infoIcon}>{item.icon}</div>
                    <div>
                      <div className={styles.infoLabel}>{item.label}</div>
                      <div className={styles.infoValue}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.mapBox}>
                <iframe
                  title="Peoples Mart Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.305066836566!2d78.3586!3d17.4607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI3JzM4LjUiTiA3OMKwMjEnMzEuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>

            {/* Contact form */}
            <div className={styles.formCol}>
              {sent ? (
                <div className={styles.sentBox}>
                  <CheckCircle2 size={64} className={styles.sentIcon} />
                  <h3>Message Sent! 🎉</h3>
                  <p>Thank you, <strong>{form.name}</strong>! We've received your message and will get back to you within 2 hours.</p>
                  <button className={styles.resetBtn} onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <h2 className={styles.formTitle}>Send us a Message</h2>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label>Full Name *</label>
                      <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" />
                    </div>
                    <div className={styles.field}>
                      <label>Phone Number</label>
                      <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="10-digit number" />
                    </div>
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                      <label>Email Address *</label>
                      <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" />
                    </div>
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                      <label>Subject *</label>
                      <select required value={form.subject} onChange={e => set('subject', e.target.value)}>
                        <option value="">Select a topic…</option>
                        <option>Order Issue</option>
                        <option>Delivery Problem</option>
                        <option>Product Quality</option>
                        <option>Payment Issue</option>
                        <option>General Inquiry</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                      <label>Message *</label>
                      <textarea required value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us how we can help…" rows={5} />
                    </div>
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
