import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>🛒 <span>Peoples<strong>MART</strong></span></div>
          <p>Your neighbourhood grocery store, now online. Fresh produce, trusted brands, delivered fast to your door.</p>
          <div className={styles.social}>
            <a href="#"><Facebook size={18} /></a>
            <a href="#"><Instagram size={18} /></a>
            <a href="#"><Twitter size={18} /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            <li><Link to="/products?cat=fruits">Fruits & Veggies</Link></li>
            <li><Link to="/products?cat=dairy">Dairy & Eggs</Link></li>
            <li><Link to="/products?cat=grains">Rice & Grains</Link></li>
            <li><Link to="/products?cat=snacks">Snacks & Drinks</Link></li>
            <li><Link to="/products?cat=spices">Masala & Spices</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <div className={styles.contactList}>
            <div><MapPin size={15} /><span>Plot 42, Kondapur, Hyderabad – 500084</span></div>
            <div><Phone size={15} /><span>+91 88975 41279</span></div>
            <div><Mail size={15} /><span>hello@peoplesmart.com </span></div>
          </div>
          <div className={styles.hours}>
            <strong>Store Hours</strong>
            <span>Mon–Sat: 9 AM – 10 PM</span>
            <span>Sun: 8 AM – 10 PM</span>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span>© 2025 Peoples Mart. All rights reserved.</span>
          <span style={{ display: 'flex', gap: 16 }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
