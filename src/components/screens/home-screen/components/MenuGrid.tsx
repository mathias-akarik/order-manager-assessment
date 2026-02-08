// components/MenuGrid.tsx

import React from "react";
import { MenuItem as MenuItemType } from "@/types/order";
import { MenuItem } from "./MenuItem";

interface MenuGridProps {
  filteredItems: MenuItemType[];
  addToCart: (item: MenuItemType) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ filteredItems, addToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
    {filteredItems?.map(item => (
      <MenuItem key={item.id} item={item} addToCart={addToCart} />
    ))}
  </div>
);

