'use client';

import { motion } from 'framer-motion';
import { DrawnCard } from '../types';
import { getImagePath } from '@/lib/imagePath';

interface TarotCardProps {
  card?: DrawnCard;
  isRevealed?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  index?: number;
}

// 只定义宽度，高度自适应图片比例 (约 1:1.76)
const sizeClasses = {
  sm: 'w-24',
  md: 'w-32',
  lg: 'w-40',
};

export default function TarotCard({
  card,
  isRevealed = false,
  onClick,
  className = '',
  size = 'md',
  index = 0,
}: TarotCardProps) {
  if (!card) {
    return (
      <div className={`${sizeClasses[size]} aspect-[300/527] ${className} rounded-lg bg-[#2C241B] border-2 border-[#D4AF37]/30`} />
    );
  }

  return (
    <motion.div
      className={`relative cursor-pointer ${sizeClasses[size]} aspect-[300/527] ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.05, y: -10 }}
    >
      {/* 牌背（未翻开时显示） */}
      {!isRevealed && (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#1B1B3A] via-[#2C241B] to-[#1B1B3A] border-2 border-[#D4AF37] overflow-hidden relative">
          <div className="absolute inset-2 border border-[#D4AF37]/50 rounded" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/3 aspect-square relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#D4AF37] -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#D4AF37] -translate-x-1/2" />
              <div className="absolute top-1/2 left-1/2 w-1/3 aspect-square border-2 border-[#D4AF37] rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-0 left-0 w-1/4 aspect-square border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute top-0 right-0 w-1/4 aspect-square border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-0 left-0 w-1/4 aspect-square border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute bottom-0 right-0 w-1/4 aspect-square border-b-2 border-r-2 border-[#D4AF37]" />
            </div>
          </div>
        </div>
      )}

      {/* 牌面（翻开后显示） */}
      {isRevealed && (
        <div 
          className={`w-full h-full rounded-lg overflow-hidden border-2 border-[#D4AF37]/50 ${card.isReversed ? 'rotate-180' : ''}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getImagePath(card.image)}
            alt={card.nameCN || 'Tarot Card'}
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error('Failed to load image:', card.image);
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
