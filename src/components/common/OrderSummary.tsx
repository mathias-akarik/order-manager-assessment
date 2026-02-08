
"use client"
import { formatCurrency } from '@/lib/utils';
import { CartItem } from '@/types/order';
import React from 'react';


interface OrderSummaryProps {
    items: CartItem[];
    total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
    const deliveryFee = 5.00;
    const taxRate = 0.08;
    const tax = total * taxRate;
    const finalTotal = total + deliveryFee + tax;

    return (
        <div className="p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-display font-bold text-slate-900 border-b border-slate-50 pb-4">Order Breakdown</h3>

            <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                    <div key={item.id} className="flex justify-between items-baseline gap-4">
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900 leading-tight">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{item.quantity} units</p>
                        </div>
                        <span className="font-mono text-sm font-bold text-slate-700">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-slate-900">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Courier Fee</span>
                    <span className="text-slate-900">{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Service Tax</span>
                    <span className="text-slate-900">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between items-center pt-6 mt-2 border-t border-slate-100">
                    <span className="text-sm font-light text-slate-500 uppercase tracking-[0.3em]">Grand Total</span>
                    <span className="text-3xl font-display font-black text-orange-600 tracking-tighter">
                        {formatCurrency(finalTotal)}
                    </span>
                </div>
            </div>
        </div>
    );
};

