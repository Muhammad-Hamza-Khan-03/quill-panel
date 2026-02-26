'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Upload,
    Search,
    Trash2,
    Copy,
    Grid,
    List as ListIcon,
    Filter,
    ImageIcon,
    Loader2,
    ExternalLink
} from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function MediaLibraryPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isLoading, setIsLoading] = useState(true);
    const [assets, setAssets] = useState<any[]>([]);

    useEffect(() => {
        // Fetching media might be complex as there is no direct "list images" 
        // in the docs provided, but we can infer some assets from products
        // For a true "Media Vault", we'd usually have a specific endpoint.
        const fetchMockMedia = () => {
            // Simulated fetch for the vault experience
            setTimeout(() => {
                setAssets([
                    { id: 1, url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a', type: 'image' },
                    { id: 2, url: 'https://images.unsplash.com/photo-1520633013533-91b29baba710', type: 'image' },
                    { id: 3, url: 'https://images.unsplash.com/photo-1574169208507-84376144848b', type: 'image' },
                ]);
                setIsLoading(false);
            }, 1000);
        };
        fetchMockMedia();
    }, []);

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success("Asset URL copied to sanctuary");
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const toastId = toast.loading("Archiving asset to cloud...");
        try {
            const response = await api.post('/uploads/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setAssets(prev => [{ id: Date.now(), url: response.data.image_url, type: 'image' }, ...prev]);
            toast.success("Asset archived successfully", { id: toastId });
        } catch (error) {
            toast.error("Failed to archive asset", { id: toastId });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-serif mb-2 text-luxury-text">Media Vault</h1>
                    <p className="text-luxury-muted text-sm">Visual assets for the Quill brand.</p>
                </div>
                <div className="flex items-center gap-3">
                    <label className="luxury-button flex items-center gap-2 cursor-pointer shadow-lg shadow-luxury-blue/20">
                        <Upload className="w-4 h-4" /> Archive Asset
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-luxury-gray/50 border border-luxury-border p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-luxury-blue text-white shadow-md' : 'text-luxury-muted hover:bg-white/5'}`}
                    >
                        <Grid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-luxury-blue text-white shadow-md' : 'text-luxury-muted hover:bg-white/5'}`}
                    >
                        <ListIcon className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-luxury-border mx-2" />
                    <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-luxury-muted hover:text-luxury-text transition-colors">
                        <Filter className="w-3 h-3" /> Filter
                    </button>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        className="w-full bg-luxury-text/5 border border-luxury-border rounded-xl py-2 pl-10 pr-4 text-xs focus:border-luxury-blue/30 outline-none transition-all"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="h-96 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-luxury-blue animate-spin" />
                </div>
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6" : "space-y-4"}>
                    {assets.map((asset, i) => (
                        <motion.div
                            key={asset.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={viewMode === 'grid'
                                ? "group relative aspect-[4/5] bg-luxury-black rounded-2xl overflow-hidden border border-luxury-border hover:border-luxury-blue/50 transition-all shadow-xl"
                                : "flex items-center gap-4 bg-luxury-gray/30 p-4 rounded-2xl border border-luxury-border group"
                            }
                        >
                            <Image
                                src={asset.url}
                                alt="Vault asset"
                                width={viewMode === 'grid' ? 400 : 64}
                                height={viewMode === 'grid' ? 500 : 64}
                                unoptimized
                                className={viewMode === 'grid' ? "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" : "w-16 h-16 rounded-lg object-cover"}
                            />

                            {viewMode === 'grid' ? (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
                                    <button
                                        onClick={() => copyUrl(asset.url)}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-luxury-blue flex items-center justify-center text-white transition-all hover:scale-110"
                                        title="Copy URL"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center text-white transition-all hover:scale-110">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-luxury-text">vault_asset_{asset.id}.jpg</p>
                                        <p className="text-[10px] text-luxury-muted uppercase tracking-widest mt-1">Image • 1.2 MB</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => copyUrl(asset.url)} className="p-2 hover:bg-luxury-blue/10 rounded-lg text-luxury-muted hover:text-luxury-blue transition-colors">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-luxury-muted hover:text-red-400 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {assets.length === 0 && (
                        <div className="col-span-full h-96 flex flex-col items-center justify-center text-luxury-muted gap-4 border-2 border-dashed border-luxury-border rounded-3xl">
                            <ImageIcon className="w-12 h-12 opacity-20" />
                            <p className="font-serif italic">Your visual vault is currently empty.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
