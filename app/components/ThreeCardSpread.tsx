'use client';

import { motion } from 'framer-motion';
import TarotCard from './TarotCard';
import { DrawnCard, POSITION_MEANINGS } from '../types';

interface ThreeCardSpreadProps {
  cards: DrawnCard[];
  revealedCards: boolean[];
  onCardClick: (index: number) => void;
  isReading?: boolean;
}

export default function ThreeCardSpread({
  cards,
  revealedCards,
  onCardClick,
}: ThreeCardSpreadProps) {
  // 如果没有卡牌，显示占位符
  if (!cards || cards.length === 0) {
    return (
      <div className="flex justify-center items-center gap-8 py-12">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-32 h-52 rounded-lg bg-gradient-to-br from-[#1B1B3A]/50 via-[#2C241B]/50 to-[#1B1B3A]/50 border-2 border-dashed border-[#D4AF37]/30 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -5, 0],
            }}
            transition={{ 
              opacity: { delay: index * 0.1 },
              y: { 
                repeat: Infinity, 
                duration: 2, 
                delay: index * 0.3,
                ease: "easeInOut"
              }
            }}
          >
            <span className="text-[#D4AF37]/30 text-2xl font-serif">?</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-12 py-8">
      {cards.map((card, index) => (
        <motion.div
          key={`card-${index}`}
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
        >
          {/* 位置标记 */}
          <div className="text-center">
            <div className="text-[#D4AF37] font-serif text-sm tracking-widest uppercase">
              {POSITION_MEANINGS[index]?.title}
            </div>
            <div className="text-[#F4E8D0]/60 text-xs mt-1">
              {POSITION_MEANINGS[index]?.subtitle}
            </div>
          </div>

          {/* 卡牌 */}
          <div className="relative">
            <TarotCard
              card={card}
              isRevealed={revealedCards[index] || false}
              onClick={() => onCardClick(index)}
              size="lg"
              index={index}
            />
            
            {/* 位置指示器 */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#8B2635] border-2 border-[#D4AF37] flex items-center justify-center text-[#F4E8D0] text-xs font-serif">
              {index + 1}
            </div>
          </div>

          {/* 卡牌信息（翻开后显示） */}
          {revealedCards[index] && card && (
            <motion.div
              className="text-center max-w-[160px]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[#F4E8D0] font-serif text-lg leading-tight">
                {card.nameCN}
              </h3>
              <p className="text-[#D4AF37]/70 text-xs mt-1">{card.name}</p>
              {card.isReversed && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-[#8B2635]/50 text-[#F4E8D0] text-xs rounded">
                  逆位
                </span>
              )}
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {card.keywords?.slice(0, 3).map((keyword, i) => (
                  <span
                    key={i}
                    className="text-[#F4E8D0]/60 text-xs px-1.5 py-0.5 bg-[#2C241B]/50 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
