import { TarotCard } from '../types';

// 大阿卡纳 (22张)
const majorArcana: TarotCard[] = [
  { id: 0, name: 'The Fool', nameCN: '愚者', image: '/tarot/00-TheFool.png', keywords: ['新的开始', '冒险', '纯真', '自由'], element: '风', number: 0 },
  { id: 1, name: 'The Magician', nameCN: '魔术师', image: '/tarot/01-TheMagician.png', keywords: ['创造力', '意志力', '显化', '能力'], element: '风', number: 1 },
  { id: 2, name: 'The High Priestess', nameCN: '女祭司', image: '/tarot/02-TheHighPriestess.png', keywords: ['直觉', '神秘', '内在智慧', '潜意识'], element: '水', number: 2 },
  { id: 3, name: 'The Empress', nameCN: '皇后', image: '/tarot/03-TheEmpress.png', keywords: ['丰饶', '母性', '创造力', '自然'], element: '土', number: 3 },
  { id: 4, name: 'The Emperor', nameCN: '皇帝', image: '/tarot/04-TheEmperor.png', keywords: ['权威', '稳定', '结构', '控制'], element: '火', number: 4 },
  { id: 5, name: 'The Hierophant', nameCN: '教皇', image: '/tarot/05-TheHierophant.png', keywords: ['传统', '信仰', '教育', '指导'], element: '土', number: 5 },
  { id: 6, name: 'The Lovers', nameCN: '恋人', image: '/tarot/06-TheLovers.png', keywords: ['爱情', '选择', '和谐', '结合'], element: '风', number: 6 },
  { id: 7, name: 'The Chariot', nameCN: '战车', image: '/tarot/07-TheChariot.png', keywords: ['意志力', '胜利', '决心', '控制'], element: '水', number: 7 },
  { id: 8, name: 'Strength', nameCN: '力量', image: '/tarot/08-Strength.png', keywords: ['勇气', '耐心', '内在力量', '同情'], element: '火', number: 8 },
  { id: 9, name: 'The Hermit', nameCN: '隐士', image: '/tarot/09-TheHermit.png', keywords: ['内省', '孤独', '指引', '智慧'], element: '土', number: 9 },
  { id: 10, name: 'Wheel of Fortune', nameCN: '命运之轮', image: '/tarot/10-WheelOfFortune.png', keywords: ['命运', '转变', '周期', '机遇'], element: '火', number: 10 },
  { id: 11, name: 'Justice', nameCN: '正义', image: '/tarot/11-Justice.png', keywords: ['公正', '真理', '因果', '平衡'], element: '风', number: 11 },
  { id: 12, name: 'The Hanged Man', nameCN: '倒吊人', image: '/tarot/12-TheHangedMan.png', keywords: ['牺牲', '等待', '新视角', '放下'], element: '水', number: 12 },
  { id: 13, name: 'Death', nameCN: '死神', image: '/tarot/13-Death.png', keywords: ['结束', '转变', '重生', '释放'], element: '水', number: 13 },
  { id: 14, name: 'Temperance', nameCN: '节制', image: '/tarot/14-Temperance.png', keywords: ['平衡', '调和', '耐心', '中庸'], element: '火', number: 14 },
  { id: 15, name: 'The Devil', nameCN: '恶魔', image: '/tarot/15-TheDevil.png', keywords: ['束缚', '欲望', '物质主义', '诱惑'], element: '土', number: 15 },
  { id: 16, name: 'The Tower', nameCN: '塔', image: '/tarot/16-TheTower.png', keywords: ['突变', '觉醒', '破坏', '启示'], element: '火', number: 16 },
  { id: 17, name: 'The Star', nameCN: '星星', image: '/tarot/17-TheStar.png', keywords: ['希望', '灵感', '宁静', '指引'], element: '风', number: 17 },
  { id: 18, name: 'The Moon', nameCN: '月亮', image: '/tarot/18-TheMoon.png', keywords: ['幻觉', '恐惧', '直觉', '潜意识'], element: '水', number: 18 },
  { id: 19, name: 'The Sun', nameCN: '太阳', image: '/tarot/19-TheSun.png', keywords: ['快乐', '成功', '活力', '真相'], element: '火', number: 19 },
  { id: 20, name: 'Judgement', nameCN: '审判', image: '/tarot/20-Judgement.png', keywords: ['重生', '觉醒', '救赎', '召唤'], element: '火', number: 20 },
  { id: 21, name: 'The World', nameCN: '世界', image: '/tarot/21-TheWorld.png', keywords: ['完成', '成就', '圆满', '整合'], element: '土', number: 21 },
];

// 小阿卡纳 - 权杖 (Wands)
const wands: TarotCard[] = [
  { id: 22, name: 'Ace of Wands', nameCN: '权杖首牌', image: '/tarot/Wands01.png', keywords: ['灵感', '创造', '新机会', '热情'], element: '火', suit: '权杖', number: 1 },
  { id: 23, name: 'Two of Wands', nameCN: '权杖二', image: '/tarot/Wands02.png', keywords: ['计划', '决策', '探索', '未来'], element: '火', suit: '权杖', number: 2 },
  { id: 24, name: 'Three of Wands', nameCN: '权杖三', image: '/tarot/Wands03.png', keywords: ['远见', '扩展', '进展', '合作'], element: '火', suit: '权杖', number: 3 },
  { id: 25, name: 'Four of Wands', nameCN: '权杖四', image: '/tarot/Wands04.png', keywords: ['庆祝', '和谐', '稳定', '喜悦'], element: '火', suit: '权杖', number: 4 },
  { id: 26, name: 'Five of Wands', nameCN: '权杖五', image: '/tarot/Wands05.png', keywords: ['冲突', '竞争', '挑战', '混乱'], element: '火', suit: '权杖', number: 5 },
  { id: 27, name: 'Six of Wands', nameCN: '权杖六', image: '/tarot/Wands06.png', keywords: ['胜利', '认可', '成功', '自信'], element: '火', suit: '权杖', number: 6 },
  { id: 28, name: 'Seven of Wands', nameCN: '权杖七', image: '/tarot/Wands07.png', keywords: ['防御', '坚持', '勇气', '立场'], element: '火', suit: '权杖', number: 7 },
  { id: 29, name: 'Eight of Wands', nameCN: '权杖八', image: '/tarot/Wands08.png', keywords: ['速度', '行动', '进展', '消息'], element: '火', suit: '权杖', number: 8 },
  { id: 30, name: 'Nine of Wands', nameCN: '权杖九', image: '/tarot/Wands09.png', keywords: ['韧性', '坚持', '防备', '准备'], element: '火', suit: '权杖', number: 9 },
  { id: 31, name: 'Ten of Wands', nameCN: '权杖十', image: '/tarot/Wands10.png', keywords: ['负担', '责任', '压力', '完成'], element: '火', suit: '权杖', number: 10 },
  { id: 32, name: 'Page of Wands', nameCN: '权杖侍从', image: '/tarot/Wands11.png', keywords: ['探索', '热情', '新想法', '冒险'], element: '火', suit: '权杖', number: 11 },
  { id: 33, name: 'Knight of Wands', nameCN: '权杖骑士', image: '/tarot/Wands12.png', keywords: ['冲动', '冒险', '热情', '行动'], element: '火', suit: '权杖', number: 12 },
  { id: 34, name: 'Queen of Wands', nameCN: '权杖皇后', image: '/tarot/Wands13.png', keywords: ['自信', '魅力', '独立', '热情'], element: '火', suit: '权杖', number: 13 },
  { id: 35, name: 'King of Wands', nameCN: '权杖国王', image: '/tarot/Wands14.png', keywords: ['领导力', '远见', '魅力', '创业'], element: '火', suit: '权杖', number: 14 },
];

// 小阿卡纳 - 圣杯 (Cups)
const cups: TarotCard[] = [
  { id: 36, name: 'Ace of Cups', nameCN: '圣杯首牌', image: '/tarot/Cups01.png', keywords: ['情感', '直觉', '爱', '灵性'], element: '水', suit: '圣杯', number: 1 },
  { id: 37, name: 'Two of Cups', nameCN: '圣杯二', image: '/tarot/Cups02.png', keywords: ['结合', '合作', '和谐', '爱情'], element: '水', suit: '圣杯', number: 2 },
  { id: 38, name: 'Three of Cups', nameCN: '圣杯三', image: '/tarot/Cups03.png', keywords: ['庆祝', '友谊', '社交', '快乐'], element: '水', suit: '圣杯', number: 3 },
  { id: 39, name: 'Four of Cups', nameCN: '圣杯四', image: '/tarot/Cups04.png', keywords: ['不满', '冷漠', '沉思', '错失'], element: '水', suit: '圣杯', number: 4 },
  { id: 40, name: 'Five of Cups', nameCN: '圣杯五', image: '/tarot/Cups05.png', keywords: ['失落', '悲伤', '失望', '遗憾'], element: '水', suit: '圣杯', number: 5 },
  { id: 41, name: 'Six of Cups', nameCN: '圣杯六', image: '/tarot/Cups06.png', keywords: ['回忆', '童年', '怀旧', '纯真'], element: '水', suit: '圣杯', number: 6 },
  { id: 42, name: 'Seven of Cups', nameCN: '圣杯七', image: '/tarot/Cups07.png', keywords: ['幻想', '选择', '欲望', '迷惑'], element: '水', suit: '圣杯', number: 7 },
  { id: 43, name: 'Eight of Cups', nameCN: '圣杯八', image: '/tarot/Cups08.png', keywords: ['离开', '放弃', '追寻', '转变'], element: '水', suit: '圣杯', number: 8 },
  { id: 44, name: 'Nine of Cups', nameCN: '圣杯九', image: '/tarot/Cups09.png', keywords: ['满足', '愿望', '幸福', '享受'], element: '水', suit: '圣杯', number: 9 },
  { id: 45, name: 'Ten of Cups', nameCN: '圣杯十', image: '/tarot/Cups10.png', keywords: ['圆满', '家庭', '和谐', '幸福'], element: '水', suit: '圣杯', number: 10 },
  { id: 46, name: 'Page of Cups', nameCN: '圣杯侍从', image: '/tarot/Cups11.png', keywords: ['创意', '直觉', '敏感', '消息'], element: '水', suit: '圣杯', number: 11 },
  { id: 47, name: 'Knight of Cups', nameCN: '圣杯骑士', image: '/tarot/Cups12.png', keywords: ['浪漫', '追求', '理想', '魅力'], element: '水', suit: '圣杯', number: 12 },
  { id: 48, name: 'Queen of Cups', nameCN: '圣杯皇后', image: '/tarot/Cups13.png', keywords: ['同情', '直觉', '温柔', '情感'], element: '水', suit: '圣杯', number: 13 },
  { id: 49, name: 'King of Cups', nameCN: '圣杯国王', image: '/tarot/Cups14.png', keywords: ['情感控制', '智慧', '慈悲', '平衡'], element: '水', suit: '圣杯', number: 14 },
];

// 小阿卡纳 - 宝剑 (Swords)
const swords: TarotCard[] = [
  { id: 50, name: 'Ace of Swords', nameCN: '宝剑首牌', image: '/tarot/Swords01.png', keywords: ['清晰', '突破', '真理', '力量'], element: '风', suit: '宝剑', number: 1 },
  { id: 51, name: 'Two of Swords', nameCN: '宝剑二', image: '/tarot/Swords02.png', keywords: ['僵局', '选择', '平衡', '犹豫'], element: '风', suit: '宝剑', number: 2 },
  { id: 52, name: 'Three of Swords', nameCN: '宝剑三', image: '/tarot/Swords03.png', keywords: ['心痛', '悲伤', '痛苦', '失落'], element: '风', suit: '宝剑', number: 3 },
  { id: 53, name: 'Four of Swords', nameCN: '宝剑四', image: '/tarot/Swords04.png', keywords: ['休息', '恢复', '冥想', '平静'], element: '风', suit: '宝剑', number: 4 },
  { id: 54, name: 'Five of Swords', nameCN: '宝剑五', image: '/tarot/Swords05.png', keywords: ['冲突', '失败', '损失', '不和'], element: '风', suit: '宝剑', number: 5 },
  { id: 55, name: 'Six of Swords', nameCN: '宝剑六', image: '/tarot/Swords06.png', keywords: ['过渡', '离开', '疗愈', '前行'], element: '风', suit: '宝剑', number: 6 },
  { id: 56, name: 'Seven of Swords', nameCN: '宝剑七', image: '/tarot/Swords07.png', keywords: ['欺骗', '策略', '隐秘', '逃避'], element: '风', suit: '宝剑', number: 7 },
  { id: 57, name: 'Eight of Swords', nameCN: '宝剑八', image: '/tarot/Swords08.png', keywords: ['束缚', '限制', '无助', '困境'], element: '风', suit: '宝剑', number: 8 },
  { id: 58, name: 'Nine of Swords', nameCN: '宝剑九', image: '/tarot/Swords09.png', keywords: ['焦虑', '恐惧', '噩梦', '担忧'], element: '风', suit: '宝剑', number: 9 },
  { id: 59, name: 'Ten of Swords', nameCN: '宝剑十', image: '/tarot/Swords10.png', keywords: ['结束', '痛苦', '背叛', '低谷'], element: '风', suit: '宝剑', number: 10 },
  { id: 60, name: 'Page of Swords', nameCN: '宝剑侍从', image: '/tarot/Swords11.png', keywords: ['好奇', '警觉', '新想法', '沟通'], element: '风', suit: '宝剑', number: 11 },
  { id: 61, name: 'Knight of Swords', nameCN: '宝剑骑士', image: '/tarot/Swords12.png', keywords: ['果断', '行动', '冲动', '雄心'], element: '风', suit: '宝剑', number: 12 },
  { id: 62, name: 'Queen of Swords', nameCN: '宝剑皇后', image: '/tarot/Swords13.png', keywords: ['独立', '清晰', '理智', '直接'], element: '风', suit: '宝剑', number: 13 },
  { id: 63, name: 'King of Swords', nameCN: '宝剑国王', image: '/tarot/Swords14.png', keywords: ['权威', '真理', '智慧', '公正'], element: '风', suit: '宝剑', number: 14 },
];

// 小阿卡纳 - 星币 (Pentacles)
const pentacles: TarotCard[] = [
  { id: 64, name: 'Ace of Pentacles', nameCN: '星币首牌', image: '/tarot/Pentacles01.png', keywords: ['物质', '财富', '机会', '实现'], element: '土', suit: '星币', number: 1 },
  { id: 65, name: 'Two of Pentacles', nameCN: '星币二', image: '/tarot/Pentacles02.png', keywords: ['平衡', '适应', '灵活', '多任务'], element: '土', suit: '星币', number: 2 },
  { id: 66, name: 'Three of Pentacles', nameCN: '星币三', image: '/tarot/Pentacles03.png', keywords: ['合作', '技能', '团队', '成就'], element: '土', suit: '星币', number: 3 },
  { id: 67, name: 'Four of Pentacles', nameCN: '星币四', image: '/tarot/Pentacles04.png', keywords: ['保守', '控制', '固执', '安全'], element: '土', suit: '星币', number: 4 },
  { id: 68, name: 'Five of Pentacles', nameCN: '星币五', image: '/tarot/Pentacles05.png', keywords: ['贫困', '损失', '孤立', '困难'], element: '土', suit: '星币', number: 5 },
  { id: 69, name: 'Six of Pentacles', nameCN: '星币六', image: '/tarot/Pentacles06.png', keywords: ['慷慨', '分享', '给予', '平衡'], element: '土', suit: '星币', number: 6 },
  { id: 70, name: 'Seven of Pentacles', nameCN: '星币七', image: '/tarot/Pentacles07.png', keywords: ['评估', '耐心', '投资', '成长'], element: '土', suit: '星币', number: 7 },
  { id: 71, name: 'Eight of Pentacles', nameCN: '星币八', image: '/tarot/Pentacles08.png', keywords: ['努力', '专注', '技能', '精通'], element: '土', suit: '星币', number: 8 },
  { id: 72, name: 'Nine of Pentacles', nameCN: '星币九', image: '/tarot/Pentacles09.png', keywords: ['独立', '奢华', '自给', '享受'], element: '土', suit: '星币', number: 9 },
  { id: 73, name: 'Ten of Pentacles', nameCN: '星币十', image: '/tarot/Pentacles10.png', keywords: ['遗产', '财富', '家庭', '长久'], element: '土', suit: '星币', number: 10 },
  { id: 74, name: 'Page of Pentacles', nameCN: '星币侍从', image: '/tarot/Pentacles11.png', keywords: ['学习', '机会', '务实', '野心'], element: '土', suit: '星币', number: 11 },
  { id: 75, name: 'Knight of Pentacles', nameCN: '星币骑士', image: '/tarot/Pentacles12.png', keywords: ['勤奋', '可靠', '耐心', '务实'], element: '土', suit: '星币', number: 12 },
  { id: 76, name: 'Queen of Pentacles', nameCN: '星币皇后', image: '/tarot/Pentacles13.png', keywords: ['滋养', '务实', '富足', '关怀'], element: '土', suit: '星币', number: 13 },
  { id: 77, name: 'King of Pentacles', nameCN: '星币国王', image: '/tarot/Pentacles14.png', keywords: ['成功', '财富', '权威', '稳定'], element: '土', suit: '星币', number: 14 },
];

// 完整牌组
export const tarotDeck: TarotCard[] = [
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...pentacles,
];

// 根据ID获取牌
export const getCardById = (id: number): TarotCard | undefined => {
  return tarotDeck.find(card => card.id === id);
};

// 随机抽取指定数量的牌
// 注意：此函数只能在客户端使用，以避免 SSR hydration 不匹配
export const drawRandomCards = (count: number = 3): TarotCard[] => {
  if (typeof window === 'undefined') {
    // 服务端渲染时返回固定的前 N 张牌
    return tarotDeck.slice(0, count);
  }
  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export default tarotDeck;
