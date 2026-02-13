'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, RotateCcw, Save, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import ThreeCardSpread from '../components/ThreeCardSpread';
import useReadingStore from '../hooks/useReadingStore';
import { interpretReading } from '../services/tarotInterpreter';

export default function ReadingPage() {
  const router = useRouter();
  const [step, setStep] = useState<'input' | 'shuffle' | 'reveal' | 'interpret'>('input');
  const [revealedCards, setRevealedCards] = useState<boolean[]>([false, false, false]);
  
  const {
    currentQuestion,
    drawnCards,
    interpretation,
    isLoading,
    setQuestion,
    drawCards,
    setInterpretation,
    setLoading,
    saveReading,
    clearCurrentReading,
  } = useReadingStore();

  // 处理问题输入
  const handleQuestionSubmit = () => {
    if (currentQuestion.trim()) {
      setStep('shuffle');
      drawCards();
    }
  };

  // 洗牌动画后进入抽牌阶段
  const handleShuffleComplete = () => {
    setStep('reveal');
  };

  // 点击翻开卡牌
  const handleCardClick = (index: number) => {
    if (step !== 'reveal') return;
    
    const newRevealed = [...revealedCards];
    newRevealed[index] = true;
    setRevealedCards(newRevealed);
  };

  // 请求AI解读
  const handleInterpret = async () => {
    setLoading(true);
    setStep('interpret');
    
    try {
      const result = await interpretReading(currentQuestion, drawnCards);
      setInterpretation(result);
    } catch (error) {
      console.error('解读失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 保存并返回
  const handleSaveAndReturn = () => {
    saveReading();
    clearCurrentReading();
    router.push('/');
  };

  // 重新开始
  const handleRestart = () => {
    clearCurrentReading();
    setRevealedCards([false, false, false]);
    setStep('input');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1B1B3A] via-[#2C241B] to-[#1B1B3A]">
      {/* 背景纹理 */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 返回按钮 */}
      <motion.button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-serif text-sm">返回</span>
      </motion.button>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl text-[#F4E8D0] mb-2">
            占卜室
          </h1>
          <p className="text-[#D4AF37]/60 text-sm">
            Three-Card Spread · 三张牌阵
          </p>
        </motion.div>

        {/* 阶段一：输入问题 */}
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* 羊皮纸卷轴效果 */}
              <div className="w-full bg-gradient-to-b from-[#F4E8D0]/10 to-[#F4E8D0]/5 rounded-lg p-8 border border-[#D4AF37]/30 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
                  <h2 className="font-serif text-xl text-[#F4E8D0] mb-2">
                    在心中默念你的问题
                  </h2>
                  <p className="text-[#F4E8D0]/60 text-sm">
                    专注于你寻求指引的领域...
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    value={currentQuestion}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="例如：我最近的职业发展会如何？"
                    className="bg-[#2C241B]/50 border-[#D4AF37]/30 text-[#F4E8D0] placeholder:text-[#F4E8D0]/30 font-serif"
                  />
                  <Button
                    onClick={handleQuestionSubmit}
                    disabled={!currentQuestion.trim()}
                    className="w-full bg-gradient-to-r from-[#8B2635] to-[#A91B0D] hover:from-[#A91B0D] hover:to-[#8B2635] text-[#F4E8D0] font-serif tracking-wider disabled:opacity-50"
                  >
                    开始洗牌
                  </Button>
                </div>
              </div>

              {/* 牌阵说明 */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[
                  { title: '过去', desc: 'Past / Situation' },
                  { title: '现在', desc: 'Present / Challenge' },
                  { title: '未来', desc: 'Future / Advice' },
                ].map((item, i) => (
                  <div key={i} className="text-[#F4E8D0]/50">
                    <div className="text-sm font-serif text-[#D4AF37]/70">{item.title}</div>
                    <div className="text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 阶段二：洗牌动画 */}
          {step === 'shuffle' && (
            <motion.div
              key="shuffle"
              className="flex-1 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={handleShuffleComplete}
            >
              <motion.div
                className="relative w-32 h-52"
                animate={{
                  rotate: [0, 10, -10, 5, -5, 0],
                  x: [0, 20, -20, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                {/* 卡牌堆叠效果 */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1B1B3A] via-[#2C241B] to-[#1B1B3A] border-2 border-[#D4AF37]"
                    style={{
                      transform: `translateY(${i * -2}px) rotate(${i * 2}deg)`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      repeat: 2,
                    }}
                  />
                ))}
              </motion.div>

              <motion.p
                className="mt-8 text-[#D4AF37] font-serif text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                正在洗牌...
              </motion.p>
            </motion.div>
          )}

          {/* 阶段三：抽牌揭示 */}
          {(step === 'reveal' || step === 'interpret') && (
            <motion.div
              key="reveal"
              className="flex-1 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* 问题显示 */}
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-[#F4E8D0]/60 text-sm">你的问题</p>
                <p className="text-[#F4E8D0] font-serif text-lg">&ldquo;{currentQuestion}&rdquo;</p>
              </motion.div>

              {/* 牌阵 */}
              <div className="flex-1 flex items-center justify-center">
                <ThreeCardSpread
                  cards={drawnCards}
                  revealedCards={revealedCards}
                  onCardClick={handleCardClick}
                  isReading={step === 'interpret'}
                />
              </div>

              {/* 操作按钮 */}
              <motion.div
                className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {(step === 'reveal' || step === 'interpret') && revealedCards.every(Boolean) && !interpretation && (
                  <Button
                    onClick={handleInterpret}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:from-[#E5C048] hover:to-[#D4AF37] text-[#1B1B3A] font-serif tracking-wider disabled:opacity-50"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {isLoading ? '解读中...' : '请求神谕解读'}
                  </Button>
                )}

                {step === 'interpret' && (
                  <>
                    {!isLoading && interpretation && (
                      <Button
                        onClick={handleSaveAndReturn}
                        className="bg-gradient-to-r from-[#8B2635] to-[#A91B0D] hover:from-[#A91B0D] hover:to-[#8B2635] text-[#F4E8D0] font-serif tracking-wider"
                      >
                        <Save className="w-5 h-5 mr-2" />
                        保存记录
                      </Button>
                    )}
                    <Button
                      onClick={handleRestart}
                      variant="outline"
                      className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-serif"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      重新占卜
                    </Button>
                  </>
                )}
              </motion.div>

              {/* 解读内容 */}
              {step === 'interpret' && (
                <motion.div
                  className="mt-8 max-w-2xl mx-auto w-full"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="bg-gradient-to-b from-[#F4E8D0]/10 to-[#F4E8D0]/5 rounded-lg p-6 border border-[#D4AF37]/30">
                    <h3 className="text-[#D4AF37] font-serif text-lg mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      神谕解读
                    </h3>
                    
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                        <span className="ml-3 text-[#F4E8D0]/70 font-serif">正在解读牌意...</span>
                      </div>
                    ) : (
                      <div className="text-[#F4E8D0]/90 leading-relaxed whitespace-pre-line font-serif max-h-[60vh] overflow-y-auto pr-2">
                        {interpretation}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
