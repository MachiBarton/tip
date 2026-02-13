import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ReadingRecord, DrawnCard, TarotCard, POSITION_MEANINGS } from '../types';
import { drawRandomCards } from '../data/tarotDeck';

interface ReadingState {
  // 当前占卜状态
  currentQuestion: string;
  drawnCards: DrawnCard[];
  interpretation: string;
  isLoading: boolean;
  
  // 历史记录
  readings: ReadingRecord[];
  
  // 动作
  setQuestion: (question: string) => void;
  drawCards: () => void;
  setInterpretation: (interpretation: string) => void;
  setLoading: (loading: boolean) => void;
  saveReading: () => void;
  clearCurrentReading: () => void;
  deleteReading: (id: string) => void;
  getReadingById: (id: string) => ReadingRecord | undefined;
}

const STORAGE_KEY = 'tarot-readings-storage';

export const useReadingStore = create<ReadingState>()(
  persist(
    (set, get) => ({
      // 初始状态
      currentQuestion: '',
      drawnCards: [],
      interpretation: '',
      isLoading: false,
      readings: [],

      // 设置问题
      setQuestion: (question: string) => set({ currentQuestion: question }),

      // 抽牌
      drawCards: () => {
        const randomCards = drawRandomCards(3);
        const drawnCards: DrawnCard[] = randomCards.map((card, index) => ({
          ...card,
          position: index as 0 | 1 | 2,
          isReversed: Math.random() < 0.3, // 30%概率逆位
          positionMeaning: POSITION_MEANINGS[index].title,
        }));
        set({ drawnCards, interpretation: '' });
      },

      // 设置解读
      setInterpretation: (interpretation: string) => set({ interpretation }),

      // 设置加载状态
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      // 保存当前占卜到历史记录
      saveReading: () => {
        const { currentQuestion, drawnCards, interpretation, readings } = get();
        if (drawnCards.length === 0) return;

        const newReading: ReadingRecord = {
          id: Math.random().toString(36).substring(2) + Date.now().toString(36),
          timestamp: Date.now(),
          question: currentQuestion || '未记录问题',
          cards: drawnCards,
          interpretation: interpretation || '暂无解读',
        };

        set({
          readings: [newReading, ...readings].slice(0, 50), // 保留最近50条
        });
      },

      // 清除当前占卜
      clearCurrentReading: () => set({
        currentQuestion: '',
        drawnCards: [],
        interpretation: '',
        isLoading: false,
      }),

      // 删除历史记录
      deleteReading: (id: string) => {
        const { readings } = get();
        set({ readings: readings.filter(r => r.id !== id) });
      },

      // 根据ID获取记录
      getReadingById: (id: string) => {
        return get().readings.find(r => r.id === id);
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ readings: state.readings }),
    }
  )
);

export default useReadingStore;
