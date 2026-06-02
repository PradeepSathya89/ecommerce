export const categories = [
  { id: 'fruits', name: 'Fruits & Veggies', emoji: '🥦', color: '#1DB954' },
  { id: 'dairy',  name: 'Dairy & Eggs',     emoji: '🥛', color: '#FFD600' },
  { id: 'grains', name: 'Rice & Grains',    emoji: '🌾', color: '#E8A020' },
  { id: 'snacks', name: 'Snacks & Drinks',  emoji: '🍿', color: '#E8161A' },
  { id: 'spices', name: 'Masala & Spices',  emoji: '🌶️', color: '#FF6B35' },
  { id: 'pulses', name: 'Pulses & Lentils', emoji: '🫘', color: '#9B5DE5' },
  { id: 'oils',   name: 'Oils & Ghee',      emoji: '🫙', color: '#F4A261' },
  { id: 'bakery', name: 'Bakery & Bread',   emoji: '🍞', color: '#E76F51' },
];

export const products = [
  // Fruits & Veggies
  { id: 1,  category: 'fruits', name: 'Fresh Tomatoes',       price: 40,  mrp: 55,  unit: '1 kg',   emoji: '🍅', badge: 'Fresh',    rating: 4.5, reviews: 128, stock: 50 },
  { id: 2,  category: 'fruits', name: 'Green Capsicum',       price: 60,  mrp: 80,  unit: '500 g',  emoji: '🫑', badge: 'Organic',  rating: 4.3, reviews: 87,  stock: 30 },
  { id: 3,  category: 'fruits', name: 'Alphonso Mangoes',     price: 199, mrp: 280, unit: '1 kg',   emoji: '🥭', badge: 'Season',   rating: 4.8, reviews: 312, stock: 20 },
  { id: 4,  category: 'fruits', name: 'Spinach Bunch',        price: 25,  mrp: 35,  unit: '500 g',  emoji: '🌿', badge: 'Fresh',    rating: 4.2, reviews: 65,  stock: 40 },
  { id: 5,  category: 'fruits', name: 'Onions (Pyaz)',        price: 35,  mrp: 45,  unit: '1 kg',   emoji: '🧅', badge: null,       rating: 4.0, reviews: 203, stock: 100 },
  { id: 6,  category: 'fruits', name: 'Bananas (Desi)',       price: 45,  mrp: 60,  unit: '12 pcs', emoji: '🍌', badge: 'Popular',  rating: 4.6, reviews: 178, stock: 60 },

  // Dairy & Eggs
  { id: 7,  category: 'dairy', name: 'Amul Full Cream Milk', price: 66,  mrp: 66,  unit: '1 L Pouch', emoji: '🥛', badge: null,      rating: 4.7, reviews: 455, stock: 80 },
  { id: 8,  category: 'dairy', name: 'Farm Fresh Eggs',      price: 84,  mrp: 100, unit: '12 pcs',    emoji: '🥚', badge: 'Farm',    rating: 4.5, reviews: 300, stock: 50 },
  { id: 9,  category: 'dairy', name: 'Britannia Paneer',     price: 89,  mrp: 110, unit: '200 g',     emoji: '🧀', badge: 'Fresh',   rating: 4.4, reviews: 190, stock: 35 },
  { id: 10, category: 'dairy', name: 'Amul Butter',          price: 55,  mrp: 60,  unit: '100 g',     emoji: '🧈', badge: null,      rating: 4.8, reviews: 520, stock: 70 },

  // Rice & Grains
  { id: 11, category: 'grains', name: 'Basmati Rice Premium', price: 149, mrp: 180, unit: '1 kg',  emoji: '🍚', badge: 'Premium', rating: 4.6, reviews: 240, stock: 45 },
  { id: 12, category: 'grains', name: 'Wheat Flour (Atta)',   price: 65,  mrp: 75,  unit: '1 kg',  emoji: '🌾', badge: null,      rating: 4.3, reviews: 185, stock: 90 },
  { id: 13, category: 'grains', name: 'Rolled Oats',          price: 120, mrp: 150, unit: '500 g', emoji: '🌿', badge: 'Healthy', rating: 4.5, reviews: 132, stock: 55 },

  // Snacks & Drinks
  { id: 14, category: 'snacks', name: 'Haldiram Aloo Bhujia', price: 65,  mrp: 80,  unit: '400 g',  emoji: '🍿', badge: 'Bestseller', rating: 4.7, reviews: 670, stock: 80 },
  { id: 15, category: 'snacks', name: 'Tropicana Orange',      price: 75,  mrp: 90,  unit: '1 L',    emoji: '🍊', badge: null,         rating: 4.3, reviews: 210, stock: 60 },
  { id: 16, category: 'snacks', name: 'Lay\'s Classic Salted', price: 20,  mrp: 20,  unit: '52 g',   emoji: '🥔', badge: 'Popular',    rating: 4.5, reviews: 890, stock: 120 },
  { id: 17, category: 'snacks', name: 'Good Day Butter Biscuit', price: 30, mrp: 30, unit: '120 g', emoji: '🍪', badge: null,         rating: 4.4, reviews: 330, stock: 100 },

  // Masala & Spices
  { id: 18, category: 'spices', name: 'Everest Garam Masala', price: 75,  mrp: 90,  unit: '100 g', emoji: '🌶️', badge: 'Authentic', rating: 4.8, reviews: 415, stock: 60 },
  { id: 19, category: 'spices', name: 'MDH Chana Masala',     price: 60,  mrp: 70,  unit: '100 g', emoji: '🫙', badge: null,         rating: 4.6, reviews: 290, stock: 70 },
  { id: 20, category: 'spices', name: 'Turmeric Powder',      price: 45,  mrp: 55,  unit: '200 g', emoji: '🌿', badge: 'Pure',       rating: 4.5, reviews: 175, stock: 80 },

  // Pulses & Lentils
  { id: 21, category: 'pulses', name: 'Toor Dal (Arhar)',    price: 130, mrp: 160, unit: '1 kg', emoji: '🫘', badge: 'Premium', rating: 4.5, reviews: 210, stock: 50 },
  { id: 22, category: 'pulses', name: 'Moong Dal Split',    price: 110, mrp: 135, unit: '1 kg', emoji: '🟡', badge: null,       rating: 4.3, reviews: 145, stock: 65 },
  { id: 23, category: 'pulses', name: 'Chana Dal',          price: 95,  mrp: 120, unit: '1 kg', emoji: '🟤', badge: null,       rating: 4.4, reviews: 180, stock: 70 },

  // Oils & Ghee
  { id: 24, category: 'oils', name: 'Amul Pure Ghee',       price: 310, mrp: 360, unit: '500 ml', emoji: '🫙', badge: 'Pure',   rating: 4.9, reviews: 620, stock: 40 },
  { id: 25, category: 'oils', name: 'Fortune Sunflower Oil', price: 145, mrp: 170, unit: '1 L',   emoji: '🌻', badge: null,     rating: 4.4, reviews: 330, stock: 55 },
  { id: 26, category: 'oils', name: 'Mustard Oil (Sarson)', price: 130, mrp: 155, unit: '1 L',   emoji: '💛', badge: 'Cold-pressed', rating: 4.5, reviews: 195, stock: 45 },

  // Bakery & Bread
  { id: 27, category: 'bakery', name: 'Britannia Whole Wheat Bread', price: 45, mrp: 50, unit: '400 g', emoji: '🍞', badge: 'Fresh', rating: 4.5, reviews: 310, stock: 40 },
  { id: 28, category: 'bakery', name: 'Khari Biscuit (Puff)',        price: 30, mrp: 35, unit: '250 g', emoji: '🥐', badge: null,    rating: 4.2, reviews: 165, stock: 60 },
];

export const getBadgeColor = (badge) => {
  const map = {
    'Fresh': '#1DB954',
    'Organic': '#1DB954',
    'Farm': '#1DB954',
    'Healthy': '#1DB954',
    'Popular': '#FF6B35',
    'Bestseller': '#FF6B35',
    'Premium': '#9B5DE5',
    'Season': '#FFD600',
    'Authentic': '#E8161A',
    'Pure': '#E8161A',
    'Cold-pressed': '#E8A020',
  };
  return map[badge] || '#E8161A';
};
