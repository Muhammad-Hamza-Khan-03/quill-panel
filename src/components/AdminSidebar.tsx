'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Layers,
    Cpu,
    Image as ImageIcon,
    Diamond,
    LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export type AdminSection = 'dashboard' | 'inventory' | 'categories' | 'scraper' | 'media';

interface MenuItem {
    id: AdminSection;
    label: string;
    icon: any;
    group: string;
    href: string;
}

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const menuItems: MenuItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Home', href: '/admin' },
        { id: 'inventory', label: 'All Products', icon: Package, group: 'Inventory', href: '/admin/inventory' },
        { id: 'categories', label: 'Categories', icon: Layers, group: 'Inventory', href: '/admin/categories' },
        { id: 'scraper', label: 'Scraper Center', icon: Cpu, group: 'Scraper', href: '/admin/scraper' },
        { id: 'media', label: 'Media Library', icon: ImageIcon, group: 'Settings', href: '/admin/media' },
    ];

    const groups = ['Home', 'Inventory', 'Scraper', 'Settings'];

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 h-screen bg-luxury-gray border-r border-luxury-border flex-col fixed left-0 top-0 z-50">
                <div className="p-6 border-b border-luxury-border flex items-center gap-3">
                    <Diamond className="w-6 h-6 text-luxury-blue" />
                    <span className="font-serif tracking-widest uppercase font-bold text-sm text-luxury-text">Admin Portal</span>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                    {groups.map(group => (
                        <div key={group} className="space-y-2">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold px-2">{group}</h3>
                            <div className="space-y-1">
                                {menuItems.filter(item => item.group === group).map(item => (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive(item.href)
                                                ? 'bg-luxury-blue text-white shadow-[0_0_15px_rgba(29,112,209,0.3)]'
                                                : 'text-luxury-muted hover:text-luxury-text hover:bg-luxury-text/5'
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-luxury-border">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Floating Bottom Navbar */}
            <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
                <div className="bg-luxury-gray/80 backdrop-blur-xl border border-luxury-border rounded-2xl p-2 shadow-2xl flex items-center justify-around">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 p-2 transition-all ${isActive(item.href) ? 'text-luxury-blue scale-110' : 'text-luxury-muted'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-[8px] uppercase tracking-tighter font-bold">{item.label.split(' ')[0]}</span>
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex flex-col items-center gap-1 p-2 text-red-400/60 cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-[8px] uppercase tracking-tighter font-bold">Exit</span>
                    </button>
                </div>
            </nav>
        </>
    );
}
