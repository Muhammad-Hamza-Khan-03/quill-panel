'use client';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const runtime = 'edge';

import React, { useState, useEffect, useRef } from 'react';
import {
    Plus,
    Upload,
    X,
    Save,
    Eye,
    Type,
    DollarSign,
    Tag,
    Info,
    Image as ImageIcon,
    CheckCircle2,
    ChevronLeft,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import Image from 'next/image';

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();
    const { updateProduct, products, fetchProducts, isLoading: isSubmitting } = useProductStore();
    const { categories, fetchCategories } = useCategoryStore();

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        price: 0,
        currency: 'PKR',
        description: '',
        item_number: '',
        material: '',
        sizing: '',
        weight: '',
        gender: 'unisex',
        type: 'shawl',
        category_id: '',
        status: 'active'
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products, fetchProducts]);

    useEffect(() => {
        const product = products.find(p => p._id === id);
        if (product && !isLoaded) {
            setFormData({
                name: product.name || '',
                slug: product.slug || '',
                price: product.price?.amount || 0,
                currency: product.price?.currency || 'PKR',
                description: product.description || '',
                item_number: product.item_number?.toString() || '',
                material: product.material || '',
                sizing: product.sizing || '',
                weight: product.weight || '',
                gender: product.gender || 'unisex',
                type: product.type || 'shawl',
                category_id: product.category?.id || '',
                status: product.status || 'active'
            });
            const existingPreviews = product.variations?.map(v => v.image_url).filter(Boolean) || [];
            const existingColors = product.variations?.map(v => v.color) || [];
            setPreviews(existingPreviews);
            setVariationColors(existingColors);
            setIsLoaded(true);
        }
    }, [products, id, isLoaded]);

    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [variationColors, setVariationColors] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Set initial category if available and not set
    useEffect(() => {
        if (categories.length > 0 && !formData.category_id && !isLoaded) {
            setFormData(prev => ({ ...prev, category_id: categories[0]._id }));
        }
    }, [categories, isLoaded]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));

        // Auto-generate slug from name
        if (name === 'name') {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setImages(prev => [...prev, ...files]);

        // Create previews and initial colors for new images
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
        setVariationColors(prev => [...prev, ...files.map(() => 'Default')]);

        toast.success(`${files.length} image(s) added`);
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
        setVariationColors(prev => prev.filter((_, i) => i !== index));
    };

    const handleColorChange = (index: number, color: string) => {
        setVariationColors(prev => {
            const next = [...prev];
            next[index] = color;
            return next;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.category_id) {
            toast.error("Please fill in essential details (Name, Price, Category)");
            return;
        }

        const selectedCategory = categories.find(c => c._id === formData.category_id);

        const productPayload = {
            name: formData.name,
            slug: formData.slug,
            gender: formData.gender,
            category: {
                id: formData.category_id,
                name: selectedCategory?.name || 'Category'
            },
            type: formData.type,
            item_number: formData.item_number ? parseInt(formData.item_number) : Math.floor(Math.random() * 100000),
            price: {
                amount: formData.price,
                currency: formData.currency
            },
            description: formData.description,
            material: formData.material,
            sizing: formData.sizing,
            weight: formData.weight,
            status: formData.status,
            variations: variationColors.map((color, i) => {
                const preview = previews[i];
                const isNewImage = preview?.startsWith('blob:');
                return {
                    color: color || 'Default',
                    image_url: isNewImage ? null : preview
                };
            })
        };

        if (productPayload.variations.length === 0 && images.length > 0) {
            productPayload.variations = variationColors.map((color) => ({ color: color || 'Default', image_url: null }));
        } else if (productPayload.variations.length === 0) {
            productPayload.variations = [{ color: 'Default', image_url: null }];
        }

        try {
            await updateProduct(id as string, productPayload, images);
            toast.success("Masterpiece updated successfully", {
                style: { background: '#0a0a0a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
                iconTheme: { primary: '#1d70d1', secondary: '#fff' }
            });
            setTimeout(() => router.push('/admin/inventory'), 1000);
        } catch (error) {
            toast.error("Failed to update masterpiece");
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Link
                        href="/admin/inventory"
                        className="flex items-center gap-2 text-luxury-muted hover:text-luxury-text transition-colors text-xs uppercase tracking-widest font-bold group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Inventory
                    </Link>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-serif text-luxury-text">Edit Masterpiece</h1>
                        <p className="text-luxury-muted font-light italic">"Refine the story of Himalayan heritage."</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            const storefrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL || 'http://localhost:5000';
                            window.open(`${storefrontUrl}/product/${formData.slug}`, '_blank');
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-luxury-border text-luxury-muted hover:text-luxury-text transition-all text-sm font-medium cursor-pointer"
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 min-w-[180px] justify-center px-8 py-3 rounded-xl bg-luxury-blue text-white shadow-lg shadow-luxury-blue/20 hover:scale-105 transition-all text-sm font-bold uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Update Product
                            </>
                        )}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-luxury-gray/30 border border-luxury-border rounded-3xl p-8 space-y-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-luxury-blue">
                                <Type className="w-5 h-5" />
                                <h2 className="text-lg font-serif font-bold">Basic Information</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Royal Azure Pashmina Shawl"
                                        className="w-full luxury-input rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={6}
                                        placeholder="Describe the craftsmanship, material origin, and the feeling of the piece..."
                                        className="w-full luxury-input resize-none rounded-xl"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">Price ({formData.currency})</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price || ''}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        className="w-full luxury-input pl-10 rounded-xl"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">SKU / Item Number</label>
                                <input
                                    type="text"
                                    name="item_number"
                                    value={formData.item_number}
                                    onChange={handleInputChange}
                                    placeholder="Leave empty for auto-gen"
                                    className="w-full luxury-input rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-luxury-gray/30 border border-luxury-border rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3 text-luxury-blue">
                            <ImageIcon className="w-5 h-5" />
                            <h2 className="text-lg font-serif font-bold">Media Gallery</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {previews.map((url, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group border border-luxury-border">
                                        <Image src={url} fill sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-full object-cover" alt="" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        {index === 0 && (
                                            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-luxury-blue text-white text-[8px] uppercase font-bold rounded">Main</div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={variationColors[index]}
                                        onChange={(e) => handleColorChange(index, e.target.value)}
                                        placeholder="Color Name"
                                        className="w-full bg-luxury-black/50 border border-luxury-border rounded-lg py-1 px-2 text-[10px] uppercase tracking-widest outline-none focus:border-luxury-blue/50 text-luxury-text text-center"
                                    />
                                </div>
                            ))}
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-[3/4] rounded-2xl border-2 border-dashed border-luxury-border flex flex-col items-center justify-center gap-3 text-luxury-muted hover:text-luxury-blue hover:border-luxury-blue/50 transition-all bg-luxury-gray/20 cursor-pointer"
                            >
                                <div className="p-3 bg-luxury-border rounded-full">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] uppercase font-bold tracking-widest">Upload Image</span>
                            </button>
                        </div>
                        <p className="text-[10px] text-luxury-muted italic">First image will be used as the primary display piece.</p>
                    </div>
                </div>

                {/* Right Column: Sidebar Details */}
                <div className="space-y-8">
                    <div className="bg-luxury-gray/30 border border-luxury-border rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3 text-luxury-blue">
                            <Tag className="w-5 h-5" />
                            <h2 className="text-lg font-serif font-bold">Organization</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">Category</label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleInputChange}
                                    className="w-full luxury-input appearance-none rounded-xl cursor-pointer"
                                >
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                    {categories.length === 0 && <option>Loading categories...</option>}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">Product Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full luxury-input appearance-none rounded-xl cursor-pointer"
                                >
                                    <option value="shawl">Shawl</option>
                                    <option value="scarf">Scarf</option>
                                    <option value="wrap">Wrap</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">Gender</label>
                                <div className="flex gap-2">
                                    {['unisex', 'female', 'male'].map(g => (
                                        <button
                                            key={g}
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, gender: g }))}
                                            className={`flex-1 py-2 rounded-lg border transition-all text-[10px] uppercase font-bold cursor-pointer ${formData.gender === g
                                                ? 'border-luxury-blue bg-luxury-blue/10 text-luxury-blue'
                                                : 'border-luxury-border text-luxury-muted hover:border-luxury-blue/50'
                                                }`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-luxury-gray/30 border border-luxury-border rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3 text-luxury-blue">
                            <Info className="w-5 h-5" />
                            <h2 className="text-lg font-serif font-bold">Attributes</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">Material</label>
                                <input
                                    type="text"
                                    name="material"
                                    value={formData.material}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 100% Grade A Cashmere"
                                    className="w-full luxury-input rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">Dimensions</label>
                                <input
                                    type="text"
                                    name="sizing"
                                    value={formData.sizing}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 200cm x 70cm"
                                    className="w-full luxury-input rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">Weight</label>
                                <input
                                    type="text"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 150g"
                                    className="w-full luxury-input rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-luxury-blue/5 border border-luxury-blue/20 rounded-3xl p-8 space-y-4">
                        <div className="flex items-center gap-2 text-luxury-blue">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Quality Check</span>
                        </div>
                        <p className="text-xs text-luxury-muted leading-relaxed font-light italic">
                            "By publishing this masterpiece, you confirm it adheres to the centuries-old tradition of artisanal craftsmanship."
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
