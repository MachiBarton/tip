'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Sparkles, BookOpen, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 预生成固定的星星配置，避免 hydration 不匹配
const generateStars = () => {
  return [...Array(20)].map((_, i) => ({
    id: i,
    left: `${(i * 5) % 100}%`,
    top: `${(i * 7 + 10) % 100}%`,
    duration: 3 + (i % 3) * 0.8,
    delay: (i % 5) * 0.4,
  }));
};

const stars = generateStars();

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 背景层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B1B3A] via-[#2C241B] to-[#1B1B3A]" />
      
      {/* 羊皮纸纹理叠加 */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 浮动粒子效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-[#D4AF37]/30 rounded-full"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={mounted ? {
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            } : undefined}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* 主内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* 顶部装饰 */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* 主标题区域 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* 神秘符号装饰 */}
          <motion.div
            className="text-[#D4AF37]/40 text-6xl mb-4 font-serif"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl text-[#F4E8D0] mb-4 tracking-wide">
            <span className="block text-[#D4AF37] text-lg md:text-xl tracking-[0.3em] mb-2 uppercase">
              The Mystic Tarot
            </span>
            神秘塔罗
          </h1>
          
          <motion.p
            className="text-[#F4E8D0]/70 text-lg md:text-xl max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            在星辰的指引下，探索命运的奥秘
          </motion.p>

          {/* 分隔线 */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          </motion.div>
        </motion.div>

        {/* 按钮组 */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {/* 开始占卜按钮 */}
          <Button
            onClick={() => router.push('/reading')}
            className="group relative px-8 py-6 bg-gradient-to-r from-[#8B2635] to-[#A91B0D] hover:from-[#A91B0D] hover:to-[#8B2635] text-[#F4E8D0] font-serif text-lg tracking-wider rounded-lg border-2 border-[#D4AF37]/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            开始占卜
          </Button>

          {/* 历史记录按钮 */}
          <Button
            onClick={() => router.push('/history')}
            variant="outline"
            className="px-8 py-6 bg-transparent text-[#D4AF37] hover:text-[#F4E8D0] hover:bg-[#D4AF37]/10 font-serif text-lg tracking-wider rounded-lg border-2 border-[#D4AF37]/50 transition-all duration-300"
          >
            <History className="w-5 h-5 mr-2" />
            历史档案
          </Button>
        </motion.div>

        {/* 底部装饰文字 */}
        <motion.div
          className="absolute bottom-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-[#F4E8D0]/40 text-sm font-serif italic">
            &ldquo;As above, so below&rdquo;
          </p>
          <p className="text-[#F4E8D0]/30 text-xs mt-1">
            如其在上，如其在下
          </p>
        </motion.div>

        {/* 角落装饰 */}
        <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#D4AF37]/30" />
        <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#D4AF37]/30" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#D4AF37]/30" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#D4AF37]/30" />
      </div>
    </main>
  );
}
