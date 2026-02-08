// Menu Item Interface
export interface MenuItem {
  id: string; // Assuming ID is a string (for consistency)
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Cart Item Interface (extends MenuItem to include quantity)
export interface CartItem extends MenuItem {
  quantity: number; // Quantity of the menu item in the cart
}

// Order Details Interface (user info for the order)
export interface OrderDetails {
  name: string;
  address: string;
  phone: string;
}

// Order Status Type (Possible statuses for an order)
export type OrderStatus = 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';

// Order Interface
export interface Order {
  id: string; // Order ID is typically a string (e.g., UUID)
  items: CartItem[]; // List of items in the order (each item is a CartItem)
  totalPrice: number; // Total price of the order (calculated)
  userDetails: OrderDetails; // User information (name, address, phone)
  status: OrderStatus; // Current status of the order
  createdAt: string; // Timestamp when the order was created (ISO string)
}
