import api from "@/lib/axiosInstance";
import { CartItem, MenuItem, Order, OrderDetails, OrderStatus } from "@/types/order";

// Fetch menu items from backend
export const fetchMenu = async (): Promise<MenuItem[]> => {
  try {
    const response = await api.get('/menu');  // Backend fetch for menu
    return response.data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw new Error('Failed to fetch menu');
  }
};

// When submitting a new order
export const submitOrder = async (details: OrderDetails, items: CartItem[], total: number): Promise<Order> => {
  try {
    const orderData = {
      userDetails: details,  // Mapping to the correct backend format
      items,
      totalPrice: total,
    };

    const response = await api.post('/order', orderData);  // Backend API for submitting the order
    const newOrder: Order = response.data;  // The backend returns the created order

    return newOrder;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw new Error('Failed to submit order');
  }
};

// Fetch all orders from backend
export const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get('/orders');  // Fetch all orders from backend
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw new Error('Failed to fetch all orders');
  }
};

// Fetch order status based on orderId
export const fetchOrderStatus = async (orderId: string): Promise<Order | null> => {
  try {
    const response = await api.get(`/orders/${orderId}`); // Fetch status from backend
    const order: Order = response.data;  // The backend handles status calculation
    return order;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw new Error('Failed to fetch order status');
  }
};
