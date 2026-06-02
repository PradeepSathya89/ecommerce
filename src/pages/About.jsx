import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, ShieldCheck, Leaf } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroBadge}>🛒 Our Story</div>
          <h1 className={styles.heroTitle}>Feeding Hyderabad<br />with Love & Freshness</h1>
          <p className={styles.heroSub}>Peoples Mart was born in 2019 with a simple mission — bring the freshness of local bazaars to your doorstep, at prices that don't hurt your pocket.</p>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          {[
            { num: '50,000+', label: 'Happy Customers', emoji: '😊' },
            { num: '2,500+', label: 'Products Listed', emoji: '📦' },
            { num: '25+', label: 'Local Farm Partners', emoji: '🌾' },
            { num: '4.8★', label: 'Average Rating', emoji: '⭐' },
          ].map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statEmoji}>{s.emoji}</span>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>What We Stand For</h2>
          <div className={styles.valuesGrid}>
            {[
              { icon: <Leaf size={28} />, title: 'Farm Fresh', text: 'We partner with over 25 local farms across Telangana and Andhra Pradesh, ensuring produce is picked and delivered within 24 hours.', color: '#1DB954' },
              { icon: <Award size={28} />, title: 'Quality First', text: 'Every product on Peoples Mart goes through a quality check. We only stock brands and produce we trust completely.', color: '#E8161A' },
              { icon: <ShieldCheck size={28} />, title: 'Safe Shopping', text: '100% secure payments, genuine products, and a hassle-free 24-hour return policy — your safety is our priority.', color: '#9B5DE5' },
              { icon: <Users size={28} />, title: 'Community Driven', text: 'We are more than a store. We support local vendors, employ from our community, and give back through food donation drives.', color: '#E8A020' },
            ].map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon} style={{ background: `${v.color}18`, color: v.color }}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Meet the Team</h2>
          <div className={styles.teamGrid}>
            {[
              { name: 'Ravi Shankar', role: 'Founder & CEO', emoji: '👨‍💼', bg: '#FFF3F3' },
              { name: 'Ananya Reddy', role: 'Head of Operations', emoji: '👩‍💼', bg: '#F0FFF4' },
              { name: 'Karthik Naidu', role: 'Head of Sourcing', emoji: '🧑‍🌾', bg: '#FFFBEA' },
              { name: 'Preethi Lakshmi', role: 'Customer Experience', emoji: '👩‍💻', bg: '#F3F0FF' },
            ].map((m, i) => (
              <div key={i} className={styles.teamCard}>
                <div className={styles.teamAvatar} style={{ background: m.bg }}>{m.emoji}</div>
                <h4 className={styles.teamName}>{m.name}</h4>
                <span className={styles.teamRole}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to experience Peoples Mart?</h2>
            <p>Fresh groceries delivered to your door in Hyderabad. Join 50,000+ happy families today.</p>
            <Link to="/products" className={styles.ctaBtn}>Start Shopping Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
