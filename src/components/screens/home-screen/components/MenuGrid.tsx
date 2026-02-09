"use client";
import React from "react";
import { MenuItem as MenuItemType, CartItem } from "@/types/order";
import { MenuItemCard } from "./MenuItem";

type MenuGridProps = {
  items: MenuItemType[] | undefined;
  cart: CartItem[];
  onAddToCart: (item: MenuItemType) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
};

export const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  cart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const getQuantity = (itemId: string) => {
    const found = cart.find((c) => c.id === itemId);
    return found?.quantity ?? 0;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
      {items?.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          quantity={getQuantity(item.id)}
          onIncrement={onAddToCart}
          onSetQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  );
};
