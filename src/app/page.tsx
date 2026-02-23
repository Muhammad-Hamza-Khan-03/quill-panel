'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Diamond } from 'lucide-react';
import { CustomCursor, AtmosphericBackground } from '@/components/Effects';
import { Toaster, toast } from 'react-hot-toast';

export default function LoginPage() {
  const [accessKey, setAccessKey] = useState('');
  const router = useRouter();

  const handleAuthenticate = () => {
    // In a real app, verify the key
    if (accessKey === 'admin123' || accessKey === '') {
      toast.success('Authentication successful', {
        style: { background: '#0a0a0a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
      router.push('/admin');
    } else {
      toast.error('Invalid Access Key', {
        style: { background: '#0a0a0a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6 relative overflow-hidden">
      <Toaster position="top-right" />
      <CustomCursor />
      <AtmosphericBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-md bg-luxury-gray/50 backdrop-blur-xl border border-luxury-border p-10 rounded-3xl space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-luxury-blue/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-luxury-blue/20">
            <Diamond className="w-8 h-8 text-luxury-blue" />
          </div>
          <h1 className="text-3xl font-serif text-luxury-text">Admin Access</h1>
          <p className="text-luxury-muted text-sm italic">"Excellence in every thread."</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold px-1">Access Key</label>
            <input
              type="password"
              placeholder="••••••••"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="w-full luxury-input text-luxury-text rounded-xl"
              onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate()}
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAuthenticate}
              className="w-full luxury-button rounded-xl flex items-center justify-center gap-2 group cursor-pointer"
            >
              Authenticate
            </button>
            <p className="text-[9px] text-center text-luxury-muted uppercase tracking-widest leading-loose">
              Secure endpoint for authorized personnel only
            </p>
          </div>
        </div>
      </motion.div>

      {/* Background brand mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] -z-0 pointer-events-none">
        <Diamond className="w-[600px] h-[600px] text-white" />
      </div>
    </div>
  );
}
