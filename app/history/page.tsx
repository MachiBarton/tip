'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, ChevronDown, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import useReadingStore from '../hooks/useReadingStore';
import { getImagePath } from '@/lib/imagePath';
import { ReadingRecord } from '../types';


export default function HistoryPage() {
  const router = useRouter();
  const { readings, deleteReading } = useReadingStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      deleteReading(selectedId);
      setDeleteDialogOpen(false);
      setSelectedId(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl text-[#F4E8D0] mb-2">
            历史档案
          </h1>
          <p className="text-[#D4AF37]/60 text-sm">
            Archives of Divination
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <span className="text-[#F4E8D0]/40 text-xs">{readings.length} 条记录</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>
        </motion.div>

        {/* 记录列表 */}
        {readings.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-[#F4E8D0]/5 flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-[#D4AF37]/30" />
            </div>
            <p className="text-[#F4E8D0]/50 font-serif text-lg mb-2">暂无占卜记录</p>
            <p className="text-[#F4E8D0]/30 text-sm mb-6">开始你的第一次占卜之旅</p>
            <Button
              onClick={() => router.push('/reading')}
              className="bg-gradient-to-r from-[#8B2635] to-[#A91B0D] hover:from-[#A91B0D] hover:to-[#8B2635] text-[#F4E8D0] font-serif"
            >
              开始占卜
            </Button>
          </motion.div>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="max-w-3xl mx-auto space-y-4 pb-20">
              {readings.map((reading, index) => (
                <ReadingCard
                  key={reading.id}
                  reading={reading}
                  isExpanded={expandedId === reading.id}
                  onToggle={() => toggleExpand(reading.id)}
                  onDelete={() => handleDelete(reading.id)}
                  formatDate={formatDate}
                  index={index}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-[#2C241B] border-[#D4AF37]/30 text-[#F4E8D0]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">焚毁记录</DialogTitle>
            <DialogDescription className="text-[#F4E8D0]/60">
              确定要永久删除这条占卜记录吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-[#D4AF37]/30 text-[#F4E8D0] hover:bg-[#D4AF37]/10"
            >
              取消
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-[#8B2635] hover:bg-[#A91B0D] text-[#F4E8D0]"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 角落装饰 */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#D4AF37]/20" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#D4AF37]/20" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#D4AF37]/20" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#D4AF37]/20" />
    </main>
  );
}

// 单条记录卡片组件
interface ReadingCardProps {
  reading: ReadingRecord;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  formatDate: (timestamp: number) => string;
  index: number;
}

function ReadingCard({ reading, isExpanded, onToggle, onDelete, formatDate, index }: ReadingCardProps) {
  return (
    <motion.div
      className="bg-gradient-to-r from-[#F4E8D0]/10 to-[#F4E8D0]/5 rounded-lg border border-[#D4AF37]/20 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* 卡片头部（始终显示） */}
      <div
        className="p-4 cursor-pointer hover:bg-[#F4E8D0]/5 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 日期 */}
            <div className="flex items-center gap-2 text-[#D4AF37]/70 text-sm">
              <Calendar className="w-4 h-4" />
              <span className="font-serif">{formatDate(reading.timestamp)}</span>
            </div>
            
            {/* 问题摘要 */}
            <div className="hidden md:block text-[#F4E8D0]/80 font-serif truncate max-w-md">
              &ldquo;{reading.question}&rdquo;
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 三张牌的缩略图 */}
            <div className="flex -space-x-2 mr-4">
              {reading.cards.map((card, i) => (
                <div
                  key={i}
                  className="w-8 h-12 rounded overflow-hidden border border-[#D4AF37]/30 relative"
                  style={{ zIndex: 3 - i }}
                >
                  <img
                    src={getImagePath(card.image)}
                    alt={card.nameCN}
                    className={`w-full h-full object-cover ${card.isReversed ? 'rotate-180' : ''}`}
                  />
                </div>
              ))}
            </div>

            {/* 展开/收起图标 */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-[#D4AF37]/70" />
            </motion.div>
          </div>
        </div>

        {/* 移动端问题显示 */}
        <div className="md:hidden mt-2 text-[#F4E8D0]/80 font-serif text-sm">
          &ldquo;{reading.question}&rdquo;
        </div>
      </div>

      {/* 展开内容 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[#D4AF37]/20"
          >
            <div className="p-4 space-y-6">
              {/* 三张牌详情 */}
              <div className="flex justify-center gap-4">
                {reading.cards.map((card, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-20 h-32 rounded-lg overflow-hidden border border-[#D4AF37]/30 relative ${card.isReversed ? 'rotate-180' : ''}`}>
                      <img
                        src={getImagePath(card.image)}
                        alt={card.nameCN}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-[#F4E8D0] text-xs font-serif">{card.nameCN}</p>
                      <p className="text-[#D4AF37]/60 text-xs">{card.positionMeaning}</p>
                      {card.isReversed && (
                        <span className="text-[#8B2635] text-xs">逆位</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 解读内容 */}
              <div className="bg-[#2C241B]/50 rounded-lg p-4">
                <h4 className="text-[#D4AF37] font-serif text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  神谕解读
                </h4>
                <div className="text-[#F4E8D0]/80 text-sm leading-relaxed whitespace-pre-line font-serif">
                  {reading.interpretation}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-[#8B2635] hover:text-[#A91B0D] hover:bg-[#8B2635]/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  焚毁记录
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
