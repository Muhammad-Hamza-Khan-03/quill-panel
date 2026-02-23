'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Package,
    Layers,
    CheckCircle2,
    Clock,
    AlertCircle,
    Cpu,
    Image as ImageIcon,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useProductStore } from '@/store/useProductStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useScraperStore } from '@/store/useScraperStore';

export default function DashboardOverview() {
    const { products, isLoading: productsLoading, fetchProducts } = useProductStore();
    const { categories, fetchCategories } = useCategoryStore();
    const { isScraping, fetchScrapedProducts } = useScraperStore();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchScrapedProducts();
    }, [fetchProducts, fetchCategories, fetchScrapedProducts]);

    const stats = [
        { label: 'Total Products', value: products.length, icon: Package, color: 'text-blue-400' },
        { label: 'Collections', value: categories.length, icon: Layers, color: 'text-purple-400' },
        { label: 'Active Items', value: products.filter(p => p.status === 'active').length, icon: CheckCircle2, color: 'text-emerald-400' },
        { label: 'Sync Status', value: isScraping ? 'Syncing...' : 'Synced', icon: Cpu, color: isScraping ? 'text-blue-400' : 'text-amber-400' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif mb-2 text-luxury-text">Boutique Intelligence</h1>
                    <p className="text-luxury-muted text-sm">Real-time overview of your Himalayan heritage inventory.</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] md:text-xs font-medium border transition-colors ${isScraping ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                    <TrendingUp className={`w-3 h-3 ${isScraping ? 'animate-pulse' : ''}`} />
                    {isScraping ? 'System: Active Synchronization' : 'System: All Weaves Synchronized'}
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-luxury-gray/50 border border-luxury-border p-4 md:p-6 rounded-2xl relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-3 md:mb-4 relative z-10">
                            <div className={`p-1.5 md:p-2 rounded-lg bg-luxury-text/5 ${stat.color}`}>
                                <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                        </div>
                        <div className="space-y-0.5 md:space-y-1 relative z-10">
                            <p className="text-luxury-muted text-[8px] md:text-xs uppercase tracking-widest font-bold">{stat.label}</p>
                            <p className="text-xl md:text-3xl font-serif text-luxury-text tracking-tight">
                                {productsLoading ? <Loader2 className="w-6 h-6 animate-spin inline" /> : stat.value}
                            </p>
                        </div>
                        <div className={`absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity ${stat.color}`}>
                            <stat.icon className="w-24 h-24" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inventory Health */}
                <div className="bg-luxury-gray/50 border border-luxury-border rounded-3xl p-8">
                    <h3 className="text-xl font-serif mb-6 text-luxury-text">System Status</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-luxury-text/5 rounded-2xl border border-white/[0.03]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-luxury-text">Catalog Integrity</p>
                                    <p className="text-xs text-luxury-muted">Verified artisanal records</p>
                                </div>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Optimal</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-luxury-text/5 rounded-2xl border border-white/[0.03]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Cpu className={`w-5 h-5 text-blue-400 ${isScraping ? 'animate-spin' : ''}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-luxury-text">Processor Node</p>
                                    <p className="text-xs text-luxury-muted">{isScraping ? 'Crawling external nodes...' : 'Node standing by'}</p>
                                </div>
                            </div>
                            <span className={`text-[10px] uppercase tracking-widest font-bold ${isScraping ? 'text-blue-400' : 'text-luxury-muted'}`}>
                                {isScraping ? 'Active' : 'Standby'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-luxury-gray/50 border border-luxury-border rounded-3xl p-8">
                    <h3 className="text-xl font-serif mb-6 text-luxury-text">Master Controls</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/inventory/add" className="contents">
                            <button className="p-4 bg-luxury-text/5 border border-luxury-border rounded-2xl hover:bg-luxury-text/10 transition-all text-left space-y-2 group cursor-pointer">
                                <Package className="w-5 h-5 text-luxury-blue group-hover:scale-110 transition-transform" />
                                <p className="text-sm font-medium text-luxury-text font-serif">Add Treasure</p>
                            </button>
                        </Link>
                        <Link href="/admin/scraper" className="contents">
                            <button className="p-4 bg-luxury-text/5 border border-luxury-border rounded-2xl hover:bg-luxury-text/10 transition-all text-left space-y-2 group cursor-pointer">
                                <Cpu className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                                <p className="text-sm font-medium text-luxury-text font-serif">Deep Search</p>
                            </button>
                        </Link>
                        <Link href="/admin/categories" className="contents">
                            <button className="p-4 bg-luxury-text/5 border border-luxury-border rounded-2xl hover:bg-luxury-text/10 transition-all text-left space-y-2 group cursor-pointer">
                                <Layers className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                                <p className="text-sm font-medium text-luxury-text font-serif">Collections</p>
                            </button>
                        </Link>
                        <Link href="/admin/media" className="contents">
                            <button className="p-4 bg-luxury-text/5 border border-luxury-border rounded-2xl hover:bg-luxury-text/10 transition-all text-left space-y-2 group cursor-pointer">
                                <ImageIcon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                                <p className="text-sm font-medium text-luxury-text font-serif">Media Vault</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
