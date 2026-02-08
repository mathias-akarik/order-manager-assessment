// components/CartItems.tsx

import React from "react";
import { CartItem as CartItemType } from "@/types/order";
import { CartItem } from "./CartItem";

interface CartItemsProps {
  cart: CartItemType[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const CartItems: React.FC<CartItemsProps> = ({ cart, removeFromCart, updateQuantity }) => (
  <div className="space-y-4">
    {cart.map(item => (
      <CartItem key={item.id} item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
    ))}
  </div>
);

