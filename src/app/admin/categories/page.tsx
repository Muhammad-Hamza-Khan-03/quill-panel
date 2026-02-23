'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Trash2,
    Eye,
    Layers,
    Loader2,
    ExternalLink
} from 'lucide-react';
import { useCategoryStore } from '@/store/useCategoryStore';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
    const { categories, isLoading, fetchCategories, createCategory, deleteCategory } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleCreateDefault = async () => {
        const name = window.prompt("Enter category name:");
        if (!name) return;

        try {
            await createCategory({
                name,
                slug: name.toLowerCase().replace(/ /g, '-'),
                description: `Heritage collection of ${name}`
            });
            toast.success("Category created successfully");
        } catch (error) {
            toast.error("Failed to create category");
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to retire the ${name} collection?`)) {
            try {
                await deleteCategory(id);
                toast.success(`${name} collection retired`);
            } catch (error) {
                toast.error("Failed to retire collection");
            }
        }
    };

    const handleView = (slug: string) => {
        const storefrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL || 'http://localhost:5000';
        window.open(`${storefrontUrl}/collection/${slug}`, '_blank');
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-serif mb-2 text-luxury-text">Collections</h1>
                    <p className="text-luxury-muted text-sm">Curated categories of artisanal weaves.</p>
                </div>
                <button
                    onClick={handleCreateDefault}
                    className="luxury-button flex items-center gap-2 cursor-pointer shadow-lg shadow-luxury-blue/20"
                >
                    <Plus className="w-4 h-4" /> New Category
                </button>
            </div>

            {isLoading && categories.length === 0 ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-luxury-blue animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, i) => (
                        <motion.div
                            key={category._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-luxury-gray/50 border border-luxury-border rounded-3xl p-8 group relative overflow-hidden"
                        >
                            <div className="relative z-10 space-y-6">
                                <div className="w-12 h-12 bg-luxury-blue/10 rounded-2xl flex items-center justify-center text-luxury-blue border border-luxury-blue/20">
                                    <Layers className="w-6 h-6" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif text-luxury-text group-hover:text-luxury-blue transition-colors">{category.name}</h3>
                                    <p className="text-sm text-luxury-muted mt-2 line-clamp-2 italic font-light">
                                        {category.description || 'Exploring the finest Himalayan craftsmanship.'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-luxury-border/50">
                                    <button
                                        onClick={() => handleView(category.slug)}
                                        className="flex-1 py-2 px-4 rounded-xl border border-luxury-border text-[10px] uppercase tracking-widest font-bold text-luxury-muted hover:text-luxury-text hover:border-luxury-text transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Eye className="w-3 h-3" /> View
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category._id, category.name)}
                                        className="p-2 rounded-xl border border-luxury-border text-red-400/50 hover:text-red-400 hover:border-red-400 transition-all cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Decorative background mark */}
                            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                                <Layers className="w-32 h-32 text-white" />
                            </div>
                        </motion.div>
                    ))}

                    <button
                        onClick={handleCreateDefault}
                        className="border-2 border-dashed border-luxury-border rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-luxury-muted hover:text-luxury-blue hover:border-luxury-blue/50 transition-all bg-luxury-text/[0.02] group"
                    >
                        <div className="w-12 h-12 rounded-full bg-luxury-border flex items-center justify-center group-hover:bg-luxury-blue/10 transition-colors">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-xs uppercase tracking-widest font-bold">Add Collection</span>
                    </button>
                </div>
            )}
        </div>
    );
}
