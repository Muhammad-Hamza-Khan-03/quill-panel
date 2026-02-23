import { create } from 'zustand';
import api from '@/lib/api';

interface Product {
    _id: string;
    name: string;
    slug: string;
    price: {
        amount: number;
        currency: string;
    };
    status: string;
    variations: any[];
    category: { id: string, name: string };
    material: string;
    sizing: string;
    weight: string;
    item_number: number | string;
    description: string;
    gender: string;
    type: string;
}

interface ProductStore {
    products: Product[];
    isLoading: boolean;
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    fetchProducts: (params?: { skip?: number, limit?: number, status?: string }) => Promise<void>;
    setPage: (page: number) => void;
    createProduct: (data: any, files?: File[]) => Promise<void>;
    updateProduct: (id: string, data: any, files?: File[]) => Promise<void>;
    updateStatus: (id: string, status: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    isLoading: false,
    total: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10,

    fetchProducts: async (params = { skip: 0, limit: 10 }) => {
        set({ isLoading: true });
        try {
            const response = await api.get('/admin/products', { params });
            const total = response.data.total || 0;
            const limit = params.limit || 10;
            set({
                products: response.data.items,
                total,
                totalPages: Math.ceil(total / limit),
                isLoading: false
            });
        } catch (error) {
            console.error('Fetch products error:', error);
            set({ isLoading: false });
        }
    },

    setPage: (page: number) => {
        const { totalPages, limit, fetchProducts } = get();
        if (page >= 1 && page <= totalPages) {
            set({ currentPage: page });
            fetchProducts({ skip: (page - 1) * limit, limit });
        }
    },

    createProduct: async (data, files) => {
        set({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append('product_data', JSON.stringify(data));

            if (files && files.length > 0) {
                files.forEach(file => formData.append('files', file));
            }

            await api.post('/admin/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Re-fetch products to update list
            const store = useProductStore.getState();
            await store.fetchProducts();
        } catch (error) {
            console.error('Create product error:', error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateProduct: async (id, data, files) => {
        set({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append('product_data', JSON.stringify(data));

            if (files && files.length > 0) {
                files.forEach(file => formData.append('files', file));
            }

            await api.put(`/admin/products/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const store = useProductStore.getState();
            await store.fetchProducts();
        } catch (error) {
            console.error('Update product error:', error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateStatus: async (id, status) => {
        try {
            await api.patch(`/admin/products/${id}/status`, { status });
            set((state) => ({
                products: state.products.map(p => p._id === id ? { ...p, status } : p)
            }));
        } catch (error) {
            console.error('Update status error:', error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            await api.delete(`/admin/products/${id}`);
            set((state) => ({
                products: state.products.filter(p => p._id !== id)
            }));
        } catch (error) {
            console.error('Delete product error:', error);
            throw error;
        }
    }
}));
