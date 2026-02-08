"use client";
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCartContext } from '@/context/cart-context';
import { useRouter } from 'next/navigation';  // Correct import for Next.js Router
import { OrderDetails } from '@/types/order';
import { submitOrder } from '@/services/orderService';
import Button from '@/components/ui/Button';
import { OrderSummary } from '@/components/common/OrderSummary';

export const CheckoutScreen: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCartContext();
  const { push } = useRouter();  // Use Next.js Router for navigation
  const [formData, setFormData] = useState<OrderDetails>({
    name: '',
    address: '',
    phone: ''
  });

  // Mutation for submitting the order
  const mutation = useMutation({
    mutationFn: () => submitOrder(formData, cart, totalPrice),
    onSuccess: () => {
      push('/order-status');  // Redirect to order status page
    },
    onError: (error) => {
      // Handle error if any occurs during order submission
      alert('There was an error placing your order. Please try again.');
    }
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation to ensure form is filled out
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    // Mutate the order data (submit the order)
    mutation.mutate();
  };

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // If cart is empty, navigate to home page only if mutation isn't successful
  useEffect(() => {
    if (cart.length === 0 && !mutation.isSuccess) {
      push('/');  // Redirect to home if the cart is empty
    }
  }, [cart, push, mutation.isSuccess]);  // Include mutation.isSuccess as a dependency

  // If cart is empty, return null to prevent rendering the checkout screen
  if (cart.length === 0 && !mutation.isSuccess) {
    return null;
  }

  // After the order is placed, clear the cart when redirected to order status
  useEffect(() => {
    if (mutation.isSuccess) {
      clearCart();  // Clear cart after the order is placed and user is redirected
    }
  }, [mutation.isSuccess, clearCart]); // Ensure cart is cleared after success

  return (
    <div className="max-w-7xl mt-12 mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 sm:gap-16">
        
        {/* Delivery Details Form */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">Delivery Details</h2>
            <div className="h-1 w-16 bg-orange-600 mt-2 rounded-full"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 space-y-6 sm:space-y-8">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-6 text-black py-4 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                placeholder="Ex. Julian Gastronomy"
                required
              />
            </div>
            
            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-6 text-black py-4 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                placeholder="Ex. (555) 000-0000"
                required
              />
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Delivery Address</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={4}
                className="w-full text-black px-6 py-4 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none placeholder:text-slate-300 font-medium"
                placeholder="Where should we bring your feast?"
                required
              ></textarea>
            </div>

            <div className="pt-4">
              {/* Reminder about real-time updates */}
              <div className="bg-orange-50/50 p-4 rounded-2xl flex items-start gap-4 text-xs sm:text-sm text-orange-800 border border-orange-100 mb-8">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">✨</div>
                <p className="leading-relaxed">We'll text you real-time updates as our chefs prepare and our drivers deliver your meal.</p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit" 
                className="w-full py-6 cursor-pointer rounded-2xl text-base uppercase tracking-widest font-black shadow-2xl shadow-orange-200"
                isLoading={mutation.isPending}
              >
                Place Final Order
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 order-1 lg:order-2">
           <div className="lg:sticky lg:top-32 space-y-6">
              <div className="mb-4 lg:hidden">
                <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">Summary</h2>
              </div>
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/20">
                <OrderSummary items={cart} total={totalPrice} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
