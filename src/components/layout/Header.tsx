"use client"

import { useCartContext } from '@/context/cart-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
    const { itemCount } = useCartContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <>
            <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 pointer-events-none">
                <header className="max-w-5xl mx-auto glass rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-auto overflow-hidden">
                    <div className="px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-900 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <span className="font-display font-black text-lg sm:text-xl tracking-tighter text-slate-900">RAFTLABS<span className="text-orange-600">FLOW</span></span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link href="/" className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isActive('/') ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                                Menu
                            </Link>
                            <Link href="/order-status" className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isActive('/order-status') ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                                Orders
                            </Link>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Link href="/cart" className="relative flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 group-hover:text-orange-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="text-xs sm:text-sm font-bold text-slate-800">{itemCount}</span>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-full w-full bg-orange-500"></span>
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-lg active:scale-90 transition-transform"
                                aria-label="Toggle Menu"
                            >
                                {isMenuOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </header>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[45] transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                <div className={`absolute top-0 right-0 h-full w-full max-w-xs bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-8 pt-24 space-y-8">
                        <h3 className="font-display font-black text-2xl tracking-tighter text-slate-900 border-b border-slate-100 pb-4">Navigation</h3>
                        <nav className="flex flex-col gap-4">
                            <Link href="/" className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${isActive('/') ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'}`}>
                                <span>The Menu</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                            <Link href="/order-status" className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${isActive('/order-status') ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'}`}>
                                <span>My Orders</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                            <Link href="/cart" className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${isActive('/cart') ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'}`}>
                                <span>Checkout</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </nav>
                        <div className="pt-8 border-t border-slate-100 text-center">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">BistroFlow Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

