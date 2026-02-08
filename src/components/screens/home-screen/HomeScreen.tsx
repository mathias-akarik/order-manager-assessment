// pages/HomeScreen.tsx
"use client"
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCartContext } from '@/context/cart-context';
import { fetchMenu } from '@/services/orderService';
import { Hero } from './components/Hero';
import { RecommendationBar } from './components/RecommendationBar';
import { CategoryButtons } from '@/components/common/CategoryButtons';

import { ErrorMessage } from '@/components/common/ErrorMessage';
import { MenuItem } from '@/types/order';
import { MenuLoader } from '@/components/common/Loaders/MenuLoader';
import { MenuGrid } from './components/MenuGrid';


export const HomeScreen = () => {
    const { cart, addToCart } = useCartContext();
    const [recommendation, setRecommendation] = useState<string | null>("We recommend");
    const [activeCategory, setActiveCategory] = useState('All');

    const { data: menuItems, isLoading, error } = useQuery({
        queryKey: ['menu'],
        queryFn: fetchMenu
    });


    const categories = ['All', ...new Set(menuItems?.map(item => item.category))];
    const filteredItems = activeCategory === 'All'
        ? menuItems
        : menuItems?.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-white pb-24">
            <Hero />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-20 relative z-10">
                {/* Recommendation Bar */}
                <RecommendationBar recommendation={recommendation} setActiveCategory={setActiveCategory} />

                {/* Category Buttons */}
                <CategoryButtons categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                {/* Menu Grid */}
                <div className="relative">
                    {isLoading && <MenuLoader />}
                    {error && <ErrorMessage message="We couldn't load the menu right now. Please refresh or try again in a few moments." />}
                    {!isLoading && !error && <MenuGrid filteredItems={filteredItems as MenuItem[]} addToCart={addToCart} />}
                </div>
            </div>
        </div>
    );
};

