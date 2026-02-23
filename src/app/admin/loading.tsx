'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Diamond } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <motion.div
                animate={{
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-12 h-12 bg-luxury-blue/10 rounded-full flex items-center justify-center border border-luxury-blue/30"
            >
                <Diamond className="w-6 h-6 text-luxury-blue" />
            </motion.div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-muted animate-pulse font-bold">
                Loading Excellence...
            </p>
        </div>
    );
}
