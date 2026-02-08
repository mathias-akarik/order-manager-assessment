"use client";
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllOrders, fetchOrderStatus } from "@/services/orderService";  
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Order } from "@/types/order";

export const OrderStatusScreen: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch all orders using React Query
  const { data: orders = [], isLoading: ordersLoading, error: ordersError } = useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: fetchAllOrders,
  });

  // Fetch order status based on selected order
  const { data: order, isLoading: statusLoading, refetch } = useQuery<Order | null, Error>({
    queryKey: ['orderStatus', selectedOrderId],
    queryFn: () => {
      if (selectedOrderId) {
        return fetchOrderStatus(selectedOrderId);
      }
      return Promise.resolve(null); // If no order is selected, return null (resolved promise)
    },
    enabled: selectedOrderId !== null, // Only enable the query when selectedOrderId is not null
    refetchInterval: 10000, // Poll every 10 seconds
  });

  // If loading, show a loading screen for the orders
  if (ordersLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto animate-pulse"></div>
        <div className="h-8 bg-slate-100 rounded-full w-48 mx-auto animate-pulse"></div>
        <div className="h-64 bg-slate-50 rounded-[3rem] animate-pulse"></div>
      </div>
    );
  }

  // If no orders are found, display the "No Active Orders" message
  if (ordersError || orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-40 text-center animate-in fade-in duration-700">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-full flex items-center justify-center text-3x sm:text-4xl grayscale opacity-50">
            📦
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">No Active Orders</h2>
        <p className="text-slate-500 mb-10 leading-relaxed text-sm sm:text-base italic">"Your table awaits its first masterpiece."</p>
        <Link href="/">
          <Button variant="primary" className="w-full sm:w-auto px-10 py-5 rounded-2xl text-lg shadow-xl shadow-orange-200">
            View the Menu
          </Button>
        </Link>
      </div>
    );
  }

  // Order progress steps
  const steps = [
    { label: "Order Received", icon: "📝", color: "bg-blue-500" },
    { label: "Preparing", icon: "👨‍🍳", color: "bg-amber-500" },
    { label: "Out for Delivery", icon: "🛵", color: "bg-orange-500" },
    { label: "Delivered", icon: "✨", color: "bg-emerald-500" },
  ];

  // Find current step index, and ensure a default of 0 if order is null
  const currentStepIndex = order ? steps.findIndex((s) => s.label === order.status) : 0; // Default to first step if no order

  // Handle status updates
  useEffect(() => {
    if (order) {
      // You may want to log or process the order status here
      console.log("Current Order Status: ", order.status);
    }
  }, [order]); // Always listen for order updates, even when it's null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 animate-in slide-in-from-bottom-10 fade-in duration-1000">
      {/* Header Section */}
      <div className="text-center mb-12 sm:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-orange-100/40 text-orange-700 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest border border-orange-200/50 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-ping"></span>
          Live Tracking
        </div>
        <h1 className="text-5xl sm:text-7xl font-display font-black text-slate-900 tracking-tighter leading-none">Your Feast Awaits</h1>
        <p className="text-slate-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
          {order?.status === 'Delivered' ? 'Journey Complete' : 'Real-time update stream'}
        </p>
      </div>

      {/* Only show the order dropdown if there are more than one order */}
      {orders.length > 1 && (
        <div className="relative max-w-sm mx-auto mb-16 z-30" ref={dropdownRef}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center mb-3">Viewing Order History</p>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 hover:border-orange-200 transition-all active:scale-95 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                #
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-slate-400 uppercase tracking-tight leading-none mb-1">Current Focus</p>
                <p className="text-sm font-bold text-slate-900 leading-none">Order {selectedOrderId}</p>
              </div>
            </div>
            <svg 
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-3 left-0 right-0 bg-white border border-slate-100 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-xl">
              <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                {orders.map((o) => (
                  <button
                    key={o.id} // Ensure unique key based on order id
                    onClick={() => {
                      setSelectedOrderId(o.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${selectedOrderId === o.id ? 'bg-orange-50/50' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${selectedOrderId === o.id ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {String(o.id).substring(0, 2)} {/* Ensure it's a string before calling substring */}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-slate-900 leading-none mb-1">Order #{o.id}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{new Date(o.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {selectedOrderId === o.id && (
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Order Status Card */}
      <div className="bg-white p-8 sm:p-16 md:p-24 rounded-[3rem] sm:rounded-[4rem] border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.04)] mb-12 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 transition-all duration-1000 group-hover:bg-orange-100"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 sm:gap-4 relative mb-16 sm:mb-24">
            <div className="hidden sm:block absolute top-1/2 left-0 w-full h-1 bg-slate-50 -translate-y-1/2 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-1000 ease-out"
                 style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
               />
            </div>
            
            <div className="sm:hidden absolute top-0 left-9 h-full w-1 bg-slate-50 rounded-full overflow-hidden">
                <div 
                  className="w-full bg-gradient-to-b from-orange-400 to-orange-600 transition-all duration-1000 ease-out"
                  style={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />
            </div>
            
            {steps.map((step, idx) => {
              const isActive = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              
              return (
                <div key={step.label} className="relative flex sm:flex-col items-center sm:gap-6 w-full sm:w-auto group/step">
                  <div className={`
                    w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center text-2xl sm:text-3xl z-10 transition-all duration-700
                    ${isActive ? `${step.color} text-white shadow-xl scale-110 sm:rotate-3` : 'bg-white text-slate-200 grayscale border border-slate-100'}
                    ${isCurrent ? 'ring-[10px] ring-orange-50' : ''}
                  `}>
                    {step.icon}
                  </div>
                  <div className="ml-8 sm:ml-0 text-left sm:text-center flex-1">
                    <span className={`text-[10px] sm:text-[10px] font-black uppercase tracking-[0.25em] block transition-colors duration-500 ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>
                      {step.label}
                    </span>
                    {isCurrent && (
                      <div className="flex items-center gap-1 mt-1 justify-start sm:justify-center">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></span>
                        <span className="text-[9px] text-orange-600 font-bold tracking-widest uppercase italic">In Progress</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8 max-w-2xl mx-auto">
        <Button 
          variant="primary" 
          className="w-full py-6 rounded-3xl text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-orange-200" 
          onClick={() => refetch()}
          isLoading={statusLoading}
        >
          Check for Updates
        </Button>
        <Link href="/" className="w-full sm:w-auto group">
          <Button 
            variant="outline" 
            className="w-full sm:px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-[0.3em] border-slate-200"
          >
            Return to Menu
          </Button>
        </Link>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">Experience the BistroFlow Standard</p>
      </div>
    </div>
  );
};
