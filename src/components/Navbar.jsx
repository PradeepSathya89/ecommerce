import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length > 1) {
      setResults(products.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6));
    } else {
      setResults([]);
    }
  };

  const goToProduct = (id) => {
    setSearchOpen(false);
    setQuery('');
    setResults([]);
    navigate(`/product/${id}`);
  };

  return (
    <>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <MapPin size={14} /> Hyderabad, Telangana
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <Phone size={14} /> +91 88975 41279 &nbsp;|&nbsp; Free delivery on orders above ₹499
          </span>
        </div>
      </div>

      {/* Main nav */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🛒</span>
            <span>
              <span className={styles.logoMain}>Peoples</span>
              <span className={styles.logoSub}>MART</span>
            </span>
          </Link>

          {/* Search bar (desktop) */}
          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search groceries, dal, atta, masala…"
              value={query}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            {results.length > 0 && (
              <div className={styles.searchDropdown}>
                {results.map(r => (
                  <div key={r.id} className={styles.searchResult} onClick={() => goToProduct(r.id)}>
                    <span className={styles.searchEmoji}>{r.emoji}</span>
                    <div>
                      <div className={styles.searchName}>{r.name}</div>
                      <div className={styles.searchPrice}>₹{r.price} / {r.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className={styles.actions}>
            <button className={styles.searchMobile} onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={20} />
            </button>
            <Link to="/cart" className={styles.cartBtn}>
              <ShoppingCart size={22} />
              {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
              <span className={styles.cartLabel}>Cart</span>
            </Link>
            <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <div className="container" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/products" className={styles.navLink}>All Products</Link>
            <Link to="/products?cat=fruits" className={styles.navLink}>🥦 Fruits & Veggies</Link>
            <Link to="/products?cat=dairy" className={styles.navLink}>🥛 Dairy & Eggs</Link>
            <Link to="/products?cat=grains" className={styles.navLink}>🌾 Rice & Grains</Link>
            <Link to="/products?cat=snacks" className={styles.navLink}>🍿 Snacks</Link>
            <Link to="/products?cat=spices" className={styles.navLink}>🌶️ Masala</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
          </div>
        </nav>

        {/* Mobile search */}
        {searchOpen && (
          <div className={styles.mobileSearch}>
            <div className="container">
              <div className={styles.searchWrap} style={{ maxWidth: '100%' }}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search…"
                  value={query}
                  onChange={handleSearch}
                  className={styles.searchInput}
                  autoFocus
                />
                {results.length > 0 && (
                  <div className={styles.searchDropdown}>
                    {results.map(r => (
                      <div key={r.id} className={styles.searchResult} onClick={() => goToProduct(r.id)}>
                        <span className={styles.searchEmoji}>{r.emoji}</span>
                        <div>
                          <div className={styles.searchName}>{r.name}</div>
                          <div className={styles.searchPrice}>₹{r.price} / {r.unit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
