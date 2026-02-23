'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-luxury-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-blue/5 rounded-full blur-[120px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-8 max-w-2xl"
            >
                <div className="relative inline-block">
                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="text-[10rem] md:text-[16rem] font-serif font-black text-white/5 leading-none select-none"
                    >
                        404
                    </motion.h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Compass className="w-16 h-16 text-luxury-blue animate-[spin_10s_linear_infinite]" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-serif text-white">Lost in the Weave</h2>
                    <p className="text-luxury-muted text-lg font-light italic max-w-md mx-auto leading-relaxed">
                        "The thread you are following seems to have faded into the Himalayan mist. Even the finest silk can sometimes lose its way."
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-8"
                >
                    <Link
                        href="/admin"
                        className="luxury-button group flex items-center gap-3 mx-auto max-w-fit"
                    >
                        Return to Dashboard
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </motion.div>

            {/* Background Micro-details */}
            <div className="absolute bottom-20 left-10 opacity-10 hidden lg:block">
                <span className="text-[10px] uppercase tracking-[0.5em] text-white [writing-mode:vertical-rl] rotate-180">Pashmina Luxury Heritage</span>
            </div>
            <div className="absolute top-40 right-10 opacity-10 hidden lg:block">
                <span className="text-[10px] uppercase tracking-[0.5em] text-white [writing-mode:vertical-rl]">Excellence in every thread</span>
            </div>
        </div>
    );
}
