'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    RefreshCw,
    Package,
    History,
    Download,
    CheckCircle2,
    Clock,
    Loader2,
    Cpu,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useScraperStore } from '@/store/useScraperStore';
import { useProductStore } from '@/store/useProductStore';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ScraperCenterPage() {
    const { isScraping, scrapedProducts, totalScraped, currentPage, totalPages, triggerScrape, fetchScrapedProducts, setPage } = useScraperStore();
    const { createProduct } = useProductStore();
    const [importingId, setImportingId] = React.useState<string | null>(null);
    const [isLoadingScraped, setIsLoadingScraped] = React.useState(false);

    useEffect(() => {
        fetchScrapedProducts({ skip: 0, limit: 10 });
    }, [fetchScrapedProducts]);

    const handleRunScraper = async () => {
        try {
            await triggerScrape();
            toast.success("Himalayan deep-search initialized", {
                style: { background: '#0a0a0a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
            });
        } catch (error) {
            toast.error("Scraper failed to initiate");
        }
    };

    const handleImport = async (p: any) => {
        if (p.category?.error) {
            toast.error(p.category.error);
            return;
        }

        setImportingId(p.scraped_id || p._id);
        try {
            const { scraped_id, _id, ...productData } = p;
            await createProduct(productData);
            toast.success(`${p.name} imported successfully`, {
                style: { background: '#0a0a0a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
            });
        } catch (error: any) {
            toast.error(error?.response?.data?.detail || "Failed to import product");
        } finally {
            setImportingId(null);
        }
    };

    const stats = [
        { label: 'Total Scraped', value: totalScraped, icon: Package, color: 'text-blue-400' },
        { label: 'Scraper Status', value: isScraping ? 'In Progress' : 'Idle', icon: Cpu, color: isScraping ? 'text-emerald-400' : 'text-luxury-muted' },
        { label: 'Last Sync', value: '2 hours ago', icon: Clock, color: 'text-amber-400' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-serif mb-2 text-luxury-text">Scraper Center</h1>
                    <p className="text-luxury-muted text-sm">Automated sourcing and catalog synchronization.</p>
                </div>
                <button
                    onClick={handleRunScraper}
                    disabled={isScraping}
                    className="luxury-button flex items-center gap-3 shadow-lg shadow-luxury-blue/20 disabled:opacity-50"
                >
                    {isScraping ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Play className="w-4 h-4 fill-current" />}
                    {isScraping ? 'Scraping Treasures...' : 'Run Scraper'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={stat.label} className="bg-luxury-gray/50 border border-luxury-border p-6 rounded-2xl flex items-center gap-5">
                        <div className={`p-3 rounded-xl bg-luxury-text/5 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-luxury-muted mb-1">{stat.label}</p>
                            <p className="text-2xl font-serif text-luxury-text">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-luxury-gray/50 border border-luxury-border rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-luxury-border flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <History className="w-5 h-5 text-luxury-blue" />
                        <h2 className="text-xl font-serif text-luxury-text">Recently Scraped</h2>
                    </div>
                    <button
                        onClick={() => fetchScrapedProducts({ skip: (currentPage - 1) * 10, limit: 10 })}
                        className="p-2 hover:bg-luxury-text/5 rounded-full transition-colors text-luxury-muted hover:text-luxury-text"
                    >
                        <RefreshCw className={`w-4 h-4 ${isScraping ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-luxury-border text-xs uppercase tracking-[0.15em] text-luxury-muted bg-luxury-text/[0.02]">
                                <th className="px-8 py-6 font-bold">Product</th>
                                <th className="px-6 py-6 font-bold">Material</th>
                                <th className="px-6 py-6 font-bold">Details</th>
                                <th className="px-6 py-6 font-bold">Price</th>
                                <th className="px-6 py-6 font-bold">Category</th>
                                <th className="px-6 py-6 font-bold">Colors</th>
                                <th className="px-8 py-6 font-bold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-luxury-border">
                            {scrapedProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-8 py-20 text-center text-luxury-muted italic">
                                        The expedition hasn't returned yet.
                                    </td>
                                </tr>
                            ) : (
                                scrapedProducts.map((p) => (
                                    <tr key={p.scraped_id || p._id} className="group hover:bg-white/[0.01]">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-24 bg-luxury-black rounded overflow-hidden shrink-0 border border-luxury-border relative">
                                                    <Image
                                                        src={p.variations?.[0]?.image_url || 'https://placehold.co/400x600/04070B/E2E8F0?text=Scraped'}
                                                        alt={p.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-base font-medium text-luxury-text leading-tight">{p.name}</p>
                                                    <p className="text-xs text-luxury-muted uppercase tracking-widest mt-2">{p.origin ? `Origin: ${p.origin}` : 'Artisanal Weave'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-base font-medium text-luxury-text">{p.material}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-sm text-luxury-muted">{p.sizing}</p>
                                            <p className="text-xs text-luxury-muted uppercase tracking-widest mt-1">{p.weight}</p>
                                        </td>
                                        <td className="px-6 py-6 text-base font-medium text-luxury-text">
                                            {p.price.currency} {p.price.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-6 font-serif italic text-luxury-muted text-base">
                                            {p.category?.name || 'Unmapped'}
                                            {p.category?.error && (
                                                <span className="block text-xs text-red-500 not-italic uppercase tracking-widest mt-1">{p.category.error}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-wrap gap-1">
                                                {Array.from(new Set(p.variations?.map((v: any) => v.color))).map((color: any, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-full bg-luxury-text/10 text-[10px] text-luxury-text uppercase tracking-widest border border-luxury-border">
                                                        {color}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => handleImport(p)}
                                                disabled={importingId === (p.scraped_id || p._id) || !!p.category?.error}
                                                className="px-6 py-3 rounded-xl bg-luxury-blue text-white text-xs uppercase font-bold tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 ml-auto shadow-lg shadow-luxury-blue/20 disabled:opacity-50 disabled:hover:scale-100 min-w-[120px]"
                                            >
                                                {importingId === (p.scraped_id || p._id) ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <><Download className="w-4 h-4" /> Import</>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="p-6 border-t border-luxury-border flex items-center justify-between">
                        <p className="text-sm text-luxury-muted">
                            Showing page {currentPage} of {totalPages} ({totalScraped} total)
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-luxury-border hover:bg-luxury-text/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 text-luxury-text" />
                            </button>
                            <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                                                ? 'bg-luxury-blue text-white'
                                                : 'text-luxury-muted hover:bg-luxury-text/5'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-luxury-border hover:bg-luxury-text/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-luxury-text" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
