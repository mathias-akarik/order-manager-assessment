// pages/CartScreen.tsx
"use client"
import React from 'react';
import { useCartContext } from '@/context/cart-context';
import { EmptyCart } from '@/components/common/EmptyStates/EmptyCart';
import { CartItems } from './components/CartItems';
import { GrandBill } from './components/GrandBill';


export const CartScreen: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCartContext();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mt-12 mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-10">
          <div className="flex items-baseline gap-4 mb-4">
            <h1 className="text-5xl font-display font-black text-slate-900 tracking-tighter">Your Order</h1>
            <span className="text-slate-400 font-mono text-sm tracking-widest">[{cart.length} ITEMS]</span>
          </div>

          <CartItems cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
        </div>

        <GrandBill totalPrice={totalPrice} />
      </div>
    </div>
  );
};

