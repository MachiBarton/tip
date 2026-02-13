// 塔罗牌数据结构
export interface TarotCard {
  id: number;
  name: string;           // 牌名（如："The Fool"）
  nameCN: string;         // 中文名（如："愚者"）
  image: string;          // 牌面图片路径
  keywords: string[];     // 关键词
  element?: string;       // 元素（火、水、风、土）
  number?: number;        // 数字（0-21为大阿卡纳，小阿卡纳为1-14）
  suit?: string;          // 花色（权杖、圣杯、宝剑、星币）
}

// 抽出的牌（包含占卜信息）
export interface DrawnCard extends TarotCard {
  position: 0 | 1 | 2;    // 0=过去, 1=现在, 2=未来
  isReversed: boolean;    // 是否逆位
  positionMeaning: string; // 位置含义
}

// 占卜记录
export interface ReadingRecord {
  id: string;             // UUID
  timestamp: number;      // 时间戳
  question: string;       // 占卜问题
  cards: DrawnCard[];     // 抽出的三张牌
  interpretation: string; // AI 解读
  mood?: string;          // 用户心情（可选）
}

// 牌阵位置含义
export const POSITION_MEANINGS = [
  { title: '过去 / 根源', subtitle: 'Past / Situation', description: '揭示问题的根源与过往影响' },
  { title: '现在 / 挑战', subtitle: 'Present / Challenge', description: '当前面临的状况与考验' },
  { title: '未来 / 指引', subtitle: 'Future / Advice', description: '未来的走向与建议' },
];
