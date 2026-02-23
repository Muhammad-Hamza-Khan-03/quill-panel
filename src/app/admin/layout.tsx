'use client';

import React from 'react';
import { Diamond } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { Toaster } from 'react-hot-toast';
import { CustomCursor, AtmosphericBackground } from '@/components/Effects';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-luxury-black text-white selection:bg-luxury-blue/30">
            <Toaster position="top-right" />
            <CustomCursor />
            <AtmosphericBackground />

            <AdminSidebar />

            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-6 border-b border-luxury-border bg-luxury-gray/50 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <Diamond className="w-5 h-5 text-luxury-blue" />
                    <span className="font-serif tracking-widest uppercase font-bold text-xs text-luxury-text">Admin Portal</span>
                </div>
            </header>

            <main className="ml-0 md:ml-64 p-6 md:p-12 min-h-screen pb-32 md:pb-12">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
