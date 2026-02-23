import { create } from 'zustand';
import api from '@/lib/api';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
}

interface CategoryStore {
    categories: Category[];
    isLoading: boolean;
    fetchCategories: () => Promise<void>;
    createCategory: (data: { name: string, slug: string, description: string }) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    isLoading: false,

    fetchCategories: async () => {
        set({ isLoading: true });
        try {
            const response = await api.get('/admin/categories');
            set({ categories: response.data, isLoading: false });
        } catch (error) {
            console.error('Fetch categories error:', error);
            set({ isLoading: false });
        }
    },

    createCategory: async (data) => {
        set({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('slug', data.slug);
            formData.append('description', data.description);

            await api.post('/admin/categories', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const store = useCategoryStore.getState();
            await store.fetchCategories();
        } catch (error) {
            console.error('Create category error:', error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteCategory: async (id) => {
        set({ isLoading: true });
        try {
            await api.delete(`/admin/categories/${id}`);
            const store = useCategoryStore.getState();
            await store.fetchCategories();
        } catch (error) {
            console.error('Delete category error:', error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }
}));
