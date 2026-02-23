export interface Variation {
  id: string;
  color_name: string;
  color_code: string;
  image_url: string;
}

export interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  helpful_votes: number;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  material: string;
  color: string;
  weight: string;
  dimensions: string;
  item_number: string;
  gender: 'Unisex' | 'Men' | 'female';
  type: 'Shawl' | 'Scarf' | 'Wrap';
  status: 'Active' | 'Draft' | 'Out of Stock';
  isLimited?: boolean;
  category_id?: string;
  rating: {
    average: number;
    count: number;
  };
  variations: Variation[];
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface ScrapedProduct {
  id: string;
  name: string;
  price_pkr: number;
  description: string;
  source_url: string;
  image_url: string;
  scraped_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Heritage Silk Blend',
    slug: 'heritage-silk-blend',
    description: 'A masterpiece of silk and cashmere, hand-woven for a lustrous finish and unparalleled softness.',
    price: 125000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDygcNeLr2QKgRgsWVRF1p8qUDejK4NVtWrZ3r__UxFUtlGrL_1vAEUuqe_wH-ZFOFmyqx7atq0AWY9zbVhQ-eF-AgQCJyitnpaJs21O1SnOzsswhScIkLcRS09-siO_tLhKM_YSTTwlaspym2VEUtnOzp3O-ezyjXf2tKFuThfkLtRNxTSrJ4iMM2_o6D5BkJ4u4mS1Xwu2whzuRUzibk2rPGZ9OovauLm57v8lmXUhNkwVpRsNvRAqkOacSvGQXQvPzzDEa14fns',
    material: '70% Cashmere, 30% Silk',
    color: 'Cream',
    weight: '180g',
    dimensions: '70 x 200 cm',
    item_number: 'PL-HSB-001',
    gender: 'Unisex',
    type: 'Shawl',
    status: 'Active',
    isLimited: true,
    rating: { average: 4.9, count: 124 },
    variations: [
      { id: 'v1', color_name: 'Cream', color_code: '#f5f5f0', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDygcNeLr2QKgRgsWVRF1p8qUDejK4NVtWrZ3r__UxFUtlGrL_1vAEUuqe_wH-ZFOFmyqx7atq0AWY9zbVhQ-eF-AgQCJyitnpaJs21O1SnOzsswhScIkLcRS09-siO_tLhKM_YSTTwlaspym2VEUtnOzp3O-ezyjXf2tKFuThfkLtRNxTSrJ4iMM2_o6D5BkJ4u4mS1Xwu2whzuRUzibk2rPGZ9OovauLm57v8lmXUhNkwVpRsNvRAqkOacSvGQXQvPzzDEa14fns' },
      { id: 'v2', color_name: 'Midnight', color_code: '#1a1d23', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCry9UzckZY3xkl9krmuIvRGdug8Qu40y80-PMIBkEI5j2r3gbRAD5ExirnJJqWR-uFR-vxk3KUv3Qwn7hYrH7PNfRZPIxsZ5Yy1n-5SUZc6XBGw0gOc9DISfFHXQa91uebrBSlU4Zgp2TdOKA8YtQQkzGNgsWfcfCnPmliRPDKzqDJVnsRmx-x6gak6S-4vImJLbanpdK_WBNLUnUiz2pslYMcX781nqpQZalh8aNMWh9olvK43hZDvuF9KufR7tzj24JAGKIi6D0' }
    ],
    reviews: [
      { id: 'r1', user_name: 'Elena R.', rating: 5, comment: 'The softness is beyond words. Truly a luxury piece.', helpful_votes: 12, date: '2024-02-15' },
      { id: 'r2', user_name: 'Marcus T.', rating: 5, comment: 'Perfect weight for evening events. The silk adds a beautiful sheen.', helpful_votes: 8, date: '2024-01-20' }
    ]
  },
  {
    id: '2',
    name: 'Pure Himalayan Wrap',
    slug: 'pure-himalayan-wrap',
    description: '100% Pure Grade A Cashmere, hand-combed from the undercoat of the Changthangi goat.',
    price: 245000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs1UlDFycR_DDXMCE2TW4pELP-AfAS1dRAb4fCyb9vGByshayRATHb-J6m8VdcOfFvHGEtT2xvqoBq78sHFmPoBWDx8RVzl96Zd3zkauJspeWyWif6HWd_B67LDQaGeK3gthXFK8HJqRsQUvGZGxzS-t4mtBvRqcO7_-i-dHcGx4fIgZUUE0usumIU8sDCiwZdv627-vx1O8A4hi2cLloMjydkLM9RqYNwU2g3Hzh7NE5S05Fwl6YCYv6VvrCoZelpa4Dc9g_-MoA',
    material: '100% Pure Cashmere',
    color: 'Grey',
    weight: '220g',
    dimensions: '100 x 200 cm',
    item_number: 'PL-PHW-002',
    gender: 'Unisex',
    type: 'Wrap',
    status: 'Active',
    rating: { average: 5.0, count: 86 },
    variations: [
      { id: 'v3', color_name: 'Grey', color_code: '#8e9299', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs1UlDFycR_DDXMCE2TW4pELP-AfAS1dRAb4fCyb9vGByshayRATHb-J6m8VdcOfFvHGEtT2xvqoBq78sHFmPoBWDx8RVzl96Zd3zkauJspeWyWif6HWd_B67LDQaGeK3gthXFK8HJqRsQUvGZGxzS-t4mtBvRqcO7_-i-dHcGx4fIgZUUE0usumIU8sDCiwZdv627-vx1O8A4hi2cLloMjydkLM9RqYNwU2g3Hzh7NE5S05Fwl6YCYv6VvrCoZelpa4Dc9g_-MoA' }
    ],
    reviews: [
      { id: 'r3', user_name: 'Sophia L.', rating: 5, comment: 'Incredibly warm and light. Worth every penny.', helpful_votes: 24, date: '2024-03-01' }
    ]
  },
  {
    id: '3',
    name: 'Everest Midnight Shawl',
    slug: 'everest-midnight-shawl',
    description: 'Ultra-fine wool from the highest altitudes, dyed in a deep midnight blue.',
    price: 335000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCry9UzckZY3xkl9krmuIvRGdug8Qu40y80-PMIBkEI5j2r3gbRAD5ExirnJJqWR-uFR-vxk3KUv3Qwn7hYrH7PNfRZPIxsZ5Yy1n-5SUZc6XBGw0gOc9DISfFHXQa91uebrBSlU4Zgp2TdOKA8YtQQkzGNgsWfcfCnPmliRPDKzqDJVnsRmx-x6gak6S-4vImJLbanpdK_WBNLUnUiz2pslYMcX781nqpQZalh8aNMWh9olvK43hZDvuF9KufR7tzj24JAGKIi6D0',
    material: 'Ultra-Fine Himalayan Wool',
    color: 'Midnight',
    weight: '300g',
    dimensions: '100 x 220 cm',
    item_number: 'PL-EMS-003',
    gender: 'Men',
    type: 'Shawl',
    status: 'Active',
    rating: { average: 4.8, count: 42 },
    variations: [],
    reviews: []
  },
  {
    id: '4',
    name: 'Summer Breeze Scarf',
    slug: 'summer-breeze-scarf',
    description: 'A lightweight blend perfect for cool summer evenings and transitional seasons.',
    price: 89000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrO9q9fOqrTlQ3gz1wYz2S1soIsLNrxBH82nN_TA5xxBxJCU8Ypic8hDzRVrlo7FTaK0hqJ_QzA-ZAVu-JUeGujupFf-oGfhAjBvs4VVbfV59uN9xlU-QOwiyO1NayltmRGOxT178n4-DtbppdzrvaU5fRbuEeRhzXO-9eb6dB4Ls5QjXqKsgZUTNy32uaD8MeQMj3Rh3aU31wrDGXSzWzlgOPZeFphimF2j7z0HiT6S2mWxwSPVbbpmdxtQZER42Kw22BOQfQW94',
    material: '50% Cashmere, 50% Fine Wool',
    color: 'Lavender',
    weight: '120g',
    dimensions: '50 x 180 cm',
    item_number: 'PL-SBS-004',
    gender: 'female',
    type: 'Scarf',
    status: 'Active',
    rating: { average: 4.7, count: 56 },
    variations: [],
    reviews: []
  },
  {
    id: '5',
    name: 'Royal Nomad Wrap',
    slug: 'royal-nomad-wrap',
    description: 'Hand-loomed by nomadic artisans using traditional techniques preserved for centuries.',
    price: 265000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZmuZLnOuOAvHxMrc3Y5ojyvYysd_0vy8bhrJVUWxvOCQyB17q8aq1pJAzb6rp-qfXZBUoxHp-PnYGmzjTMAu_9GhGO9ADfrs18n4uT38HWHca5Zkh-34EWttnplfaI-zht7HLeiCta6DWulw2ZfhWBQL-PvZ_B1VMZ-Aybvt0gAeqRnajh0ohOoFk3BYcFcFhTMas8sHvniuQFHun9VWDsXmcOt3l6YN4MjJx8mgw2XEhzHfI26HDRZKZc-__LbaBtiyCYIgBc1I',
    material: '100% Hand-loomed Pashmina',
    color: 'Terracotta',
    weight: '250g',
    dimensions: '90 x 200 cm',
    item_number: 'PL-RNW-005',
    gender: 'Unisex',
    type: 'Wrap',
    status: 'Active',
    rating: { average: 4.9, count: 38 },
    variations: [],
    reviews: []
  },
  {
    id: '6',
    name: 'Highland Mist Scarf',
    slug: 'highland-mist-scarf',
    description: 'Fine gauge cashmere scarf in a subtle fog grey, offering elegance and warmth.',
    price: 78000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkvBf1QPnNTQWYUV3VHIWNqMzkdSTOXxtOFuMOsm9eU7XIIRu_NJn1Qjroc0gCMrXMAMKFl8UL2rO6_3kVAHLC7eGyVcf8ZR-y2Og2rWSg9E-QzRLNNi-7N6MOsGEWl-DxJdeQO6hIK4m0sPupnzfKF1o-6dc9G8ZPwN8B1nMAKE0-At_c4FjF2t4EUuVeyj1vddgpBS9PtdwEC32aHNsOPh76Jpu4HSzj0miWMhDmTKG9LqnNmkeZkoCk4o5HYul83imRAwxE7pA',
    material: '100% Fine Gauge Cashmere',
    color: 'Fog Grey',
    weight: '100g',
    dimensions: '45 x 180 cm',
    item_number: 'PL-HMS-006',
    gender: 'Unisex',
    type: 'Scarf',
    status: 'Active',
    rating: { average: 4.6, count: 29 },
    variations: [],
    reviews: []
  },
  {
    id: '7',
    name: 'Golden Hour Silk',
    slug: 'golden-hour-silk',
    description: 'Ornate gold embroidered silk pashmina, a statement piece for formal occasions.',
    price: 155000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUWoOs7OHBV-OukRF3AslwEZVZ1hQDwwmL6j8CcPYkMJIT1SwdZgyMqzwJUmxyc1eS7eIjMk25Y8-F_gBHYZ1uTniabh74AxVGSBLqiZnbnqnrQim8HZ4NxV4v1U_0YSKs4nnFaL39QeVoMie5thseWjn1qBQTgHsT0mx4OtYQPUCGL0ZCsVt_jCmCHQe85VF5GVLT16ZHOyNSS8aBSojb6F-XJYKJg6hSbQRrysU3v6tLlRFeUpoTXGMmMvV7w8Og1Q8EnpIwr8',
    material: 'Silk & Cashmere with Gold Thread',
    color: 'Gold',
    weight: '210g',
    dimensions: '70 x 200 cm',
    item_number: 'PL-GHS-007',
    gender: 'female',
    type: 'Shawl',
    status: 'Active',
    rating: { average: 4.9, count: 18 },
    variations: [],
    reviews: []
  },
  {
    id: '8',
    name: 'Arctic Frost Shawl',
    slug: 'arctic-frost-shawl',
    description: 'Double-ply pure white cashmere shawl, offering exceptional warmth and a clean aesthetic.',
    price: 210000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_z0mpgG-S-U42VWW4gk5FHXwYbroMl4iX9bv2a2pW7nArgCOcuXfboMRmZovBkNsMIDwJyG087cEcF3lsDKVXP-YJIiHoq0XLRz0-sEYGWnlAEelVajjU2ieljTLWFHkeNZUSzkLjAURm9382XJ12VHRqh1uufrbIQz8YjgE_DjVn6XrLrtvK9dDtLIxXKdxRzbQo2Fg21gla_g302xOf4AD81XY3e-Q7VRS8evsFAaAbnGibRRXEx03u3PtZUoK_bmdU9ug69-Y',
    material: 'Double-ply Pure Cashmere',
    color: 'White',
    weight: '280g',
    dimensions: '100 x 200 cm',
    item_number: 'PL-AFS-008',
    gender: 'Unisex',
    type: 'Shawl',
    status: 'Active',
    rating: { average: 5.0, count: 31 },
    variations: [],
    reviews: []
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'Pure Pashmina',
    slug: 'pure-pashmina',
    description: 'The gold standard of Himalayan warmth.',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c2',
    name: 'Silk Blends',
    slug: 'silk-blends',
    description: 'Lustrous silk combined with soft cashmere.',
    image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=400&auto=format&fit=crop'
  }
];

export const SCRAPED_PRODUCTS: ScrapedProduct[] = [
  {
    id: 's1',
    name: 'Vintage Embroidered Shawl',
    price_pkr: 45000,
    description: 'Hand-embroidered vintage piece from Kashmir.',
    source_url: 'https://example-shawl-store.com/p/123',
    image_url: 'https://images.unsplash.com/photo-1511406361295-0a5ff814c0ad?q=80&w=400&auto=format&fit=crop',
    scraped_at: '2024-03-20T10:00:00Z'
  }
];
