import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QTY': {
      if (action.payload.qty < 1) return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i) };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const saved = localStorage.getItem('pm_cart');
  const [state, dispatch] = useReducer(cartReducer, { items: saved ? JSON.parse(saved) : [] });

  useEffect(() => {
    localStorage.setItem('pm_cart', JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal   = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  const savings    = state.items.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0);

  return (
    <CartContext.Provider value={{ ...state, dispatch, totalItems, subtotal, savings }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
