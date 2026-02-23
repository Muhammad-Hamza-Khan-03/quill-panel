'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
    Loader2
} from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import { AdminProductSkeleton, AdminProductGridSkeleton } from '@/components/Skeletons';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ProductInventoryPage() {
    const { products, isLoading, total, currentPage, totalPages, fetchProducts, setPage, deleteProduct, updateStatus } = useProductStore();
    const [filter, setFilter] = React.useState<'All' | 'active' | 'draft' | 'archived'>('All');
    const [search, setSearch] = React.useState('');

    useEffect(() => {
        fetchProducts({ skip: 0, limit: 10 });
    }, [fetchProducts]);

    useEffect(() => {
        const filtered = products.filter(p => filter === 'All' || p.status === filter);
    }, [products, filter]);

    const filteredProducts = products.filter(p => {
        const matchesFilter = filter === 'All' || p.status === filter;
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handlePreview = (product: any) => {
        const storefrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL || 'http://localhost:5000';
        window.open(`${storefrontUrl}/product/${product.slug}`, '_blank');
    };

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await deleteProduct(id);
                toast.success(`${name} deleted successfully`);
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const handleStatusToggle = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'draft' : 'active';
        try {
            await updateStatus(id, newStatus);
            toast.success(`Product marked as ${newStatus}`);
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-serif mb-2 text-luxury-text">Inventory</h1>
                    <p className="text-luxury-muted text-sm">Manage your exquisite collection of pashminas.</p>
                </div>
                <Link href="/admin/inventory/add" className="w-full md:w-auto">
                    <button className="luxury-button flex items-center gap-2 cursor-pointer w-full justify-center">
                        <Plus className="w-4 h-4" /> Add Product
                    </button>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-luxury-gray/50 border border-luxury-border p-4 rounded-xl">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {['All', 'active', 'draft', 'archived'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer ${filter === f
                                ? 'bg-luxury-blue text-white shadow-[0_0_10px_rgba(29,112,209,0.2)]'
                                : 'text-luxury-muted hover:text-luxury-text hover:bg-luxury-text/5'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-luxury-text/5 border border-luxury-border rounded-lg py-2 pl-10 pr-4 text-xs focus:border-luxury-blue/30 outline-none transition-all text-luxury-text"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-luxury-gray/50 border border-luxury-border rounded-2xl overflow-hidden relative min-h-[400px]">
                {isLoading && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-luxury-blue animate-spin" />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-luxury-border text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                                <th className="px-6 py-6 font-bold">Product</th>
                                <th className="px-4 py-6 font-bold">Category</th>
                                <th className="px-4 py-6 font-bold">Price</th>
                                <th className="px-4 py-6 font-bold">Status</th>
                                <th className="px-4 py-6 font-bold">Colors</th>
                                <th className="px-6 py-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-luxury-border">
                            {isLoading && products.length === 0 ? (
                                <AdminProductGridSkeleton count={10} />
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center text-luxury-muted italic">
                                        No products found in the sanctuary.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-16 bg-luxury-black rounded overflow-hidden shrink-0 border border-luxury-border">
                                                    <Image
                                                        src={product.variations?.[0]?.image_url || 'https://placehold.co/400x600/04070B/E2E8F0?text=Pashmina'}
                                                        alt={product.name}
                                                        width={48}
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                        unoptimized
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-luxury-text leading-tight">{product.name}</p>
                                                    <p className="text-[10px] text-luxury-muted uppercase tracking-widest mt-1">{product.material || 'Premium Cashmere'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 font-serif italic text-luxury-muted">{product.category?.name || 'Uncategorized'}</td>
                                        <td className="px-4 py-5 text-sm font-medium text-luxury-text whitespace-nowrap">
                                            {product.price.currency} {product.price.amount.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-5">
                                            <button
                                                onClick={() => handleStatusToggle(product._id, product.status)}
                                                className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold whitespace-nowrap cursor-pointer transition-all hover:scale-105 ${product.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    product.status === 'draft' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                        'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    }`}
                                            >
                                                {product.status}
                                            </button>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="flex flex-wrap gap-1">
                                                {Array.from(new Set(product.variations?.map((v: any) => v.color))).map((color: any, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-full bg-luxury-text/10 text-[8px] text-luxury-text uppercase tracking-widest border border-luxury-border">
                                                        {color}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handlePreview(product)}
                                                    className="p-2 hover:bg-luxury-blue/10 rounded-lg transition-colors text-luxury-muted hover:text-luxury-blue cursor-pointer"
                                                    title="View details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <Link href={`/admin/inventory/edit/${product._id}`}>
                                                    <button className="p-2 hover:bg-luxury-text/10 rounded-lg transition-colors text-luxury-muted hover:text-luxury-text cursor-pointer">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id, product.name)}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-luxury-muted hover:text-red-400 cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-luxury-border flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-luxury-muted">
                        Showing {filteredProducts.length} of {total} results
                    </p>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setPage(currentPage - 1)}
                            disabled={currentPage === 1 || isLoading}
                            className="p-2 hover:bg-luxury-text/5 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    disabled={isLoading}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                                        currentPage === i + 1
                                            ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/20'
                                            : 'text-luxury-muted hover:bg-luxury-text/5'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => setPage(currentPage + 1)}
                            disabled={currentPage === totalPages || isLoading}
                            className="p-2 hover:bg-luxury-text/5 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
