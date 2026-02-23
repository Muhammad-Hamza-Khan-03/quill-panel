import { create } from 'zustand';
import api from '@/lib/api';

interface ScraperStore {
    isScraping: boolean;
    scrapedProducts: any[];
    totalScraped: number;
    currentPage: number;
    totalPages: number;
    triggerScrape: () => Promise<void>;
    fetchScrapedProducts: (params?: { skip?: number, limit?: number }) => Promise<void>;
    setPage: (page: number) => void;
}

export const useScraperStore = create<ScraperStore>((set, get) => ({
    isScraping: false,
    scrapedProducts: [],
    totalScraped: 0,
    currentPage: 1,
    totalPages: 1,

    triggerScrape: async () => {
        set({ isScraping: true });
        try {
            await api.post('/admin/scrape');
            // Scraping is background, we just show it started
        } catch (error) {
            console.error('Trigger scrape error:', error);
        } finally {
            // In a real app we might poll for status
            setTimeout(() => set({ isScraping: false }), 5000);
        }
    },

    fetchScrapedProducts: async (params = { skip: 0, limit: 10 }) => {
        try {
            const response = await api.get('/admin/scraped-products', { params });
            const total = response.data.total_scraped || response.data.count || 0;
            const limit = params.limit || 10;
            set({
                scrapedProducts: response.data.items,
                totalScraped: total,
                totalPages: Math.ceil(total / limit)
            });
        } catch (error) {
            console.error('Fetch scraped products error:', error);
        }
    },

    setPage: (page: number) => {
        const { totalPages, fetchScrapedProducts } = get();
        if (page >= 1 && page <= totalPages) {
            set({ currentPage: page });
            fetchScrapedProducts({ skip: (page - 1) * 10, limit: 10 });
        }
    }
}));
