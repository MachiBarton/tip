import { DrawnCard } from "../types";

const API_URL = "https://api.moonshot.cn/v1/chat/completions";
// 硬编码 API Key（静态部署需要）
const API_KEY = "sk-TYerLzZHNmmZL7uU3lJnOaGlroO60mvLTN4SyIC10dZWH2wI";

export const interpretReading = async (
  question: string,
  cards: DrawnCard[],
): Promise<string> => {
  // 如果没有API密钥，直接返回模拟解读
  if (!API_KEY) {
    console.log("No API key, using mock interpretation");
    return generateMockInterpretation(question, cards);
  }

  const prompt = `你是一位深谙神秘学的塔罗牌大师，精通大阿尔克那（Major Arcana）与小阿尔克那（Minor Arcana）的智慧。请基于时间之流牌阵（过去-现在-未来）为求问者提供深度解读。

## 占卜问题
"${question || "寻求命运的指引"}"

## 牌阵解读

### 第一张牌 · 过去/根源
**${cards[0]?.nameCN}** (${cards[0]?.isReversed ? "逆位" : "正位"}) ${cards[0]?.number === 0 ? "· 大阿尔克那" : cards[0]?.suit ? `· ${cards[0]?.suit} ${cards[0]?.number}` : "· 大阿尔克那"}
- 关键词：${cards[0]?.keywords?.join("、")}
- 元素：${cards[0]?.element}

### 第二张牌 · 现在/挑战
**${cards[1]?.nameCN}** (${cards[1]?.isReversed ? "逆位" : "正位"}) ${cards[1]?.number === 0 ? "· 大阿尔克那" : cards[1]?.suit ? `· ${cards[1]?.suit} ${cards[1]?.number}` : "· 大阿尔克那"}
- 关键词：${cards[1]?.keywords?.join("、")}
- 元素：${cards[1]?.element}

### 第三张牌 · 未来/指引
**${cards[2]?.nameCN}** (${cards[2]?.isReversed ? "逆位" : "正位"}) ${cards[2]?.number === 0 ? "· 大阿尔克那" : cards[2]?.suit ? `· ${cards[2]?.suit} ${cards[2]?.number}` : "· 大阿尔克那"}
- 关键词：${cards[2]?.keywords?.join("、")}
- 元素：${cards[2]?.element}

## 解读要求

请以「亲爱的求问者」开头，用神秘优雅的中世纪文风（中文表达）撰写解读：

1. **过去之影**：分析第一张牌如何塑造了当前处境的根源。结合牌面象征、元素属性，说明这段过去如何影响现在。

2. **当下迷雾**：解读第二张牌揭示的当前能量与挑战。说明正位/逆位如何呈现不同的面对方式，以及需要觉察的核心课题。

3. **未来之门**：阐释第三张牌指引的可能走向。这不是宿命预言，而是基于当前能量流动的趋势指引，说明如何主动创造理想结果。

4. **牌阵交织**：将三张牌串联成一个完整的故事线，分析元素之间的生克关系（如火生土、水克火等），以及数字能量的演变。

5. **智慧指引**：针对求问者的具体问题，给出切实可行的建议。包括心态调整、行动方向、需要避免的模式等。

6. **总结回答**：用一句话凝练核心启示，直接回应求问者的问题。

字数控制在 500-700 字，保持神秘而温暖的语调，让求问者感受到被理解与支持。`;

  try {
    console.log("Calling AI API...");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "kimi-k2-turbo-preview",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error:", response.status, errorText);
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (content) {
      console.log("AI response received");
      return content;
    }

    throw new Error("Empty response from API");
  } catch (error) {
    console.error("解读失败，使用备用解读:", error);
    return generateMockInterpretation(question, cards);
  }
};

// 模拟解读（当API不可用时使用）
const generateMockInterpretation = (
  question: string,
  cards: DrawnCard[],
): string => {
  if (!cards || cards.length < 3) {
    return "牌阵不完整，无法解读。";
  }

  const positionTexts = [
    `过去之影中，${cards[0].nameCN}如幽灵般浮现${cards[0].isReversed ? "，逆位暗示这段过往尚未完全释放其影响" : "，正位昭示着那段时光留下的深刻印记"}。`,
    `当下迷雾里，${cards[1].nameCN}静静伫立${cards[1].isReversed ? "，逆位揭示了你正在抗拒的某种真相" : "，正位指引你正视眼前的挑战"}。`,
    `未来之门后，${cards[2].nameCN}闪烁着微光${cards[2].isReversed ? "，逆位提醒这条道路需要更多耐心" : "，正位预示着即将到来的转机"}。`,
  ];

  return `亲爱的求问者，

${positionTexts[0]}${cards[0].keywords?.slice(0, 2).join("与")}的能量仍在你的血脉中流淌。

${positionTexts[1]}${cards[1].keywords?.slice(0, 2).join("和")}的交织构成了你此刻的试炼。

${positionTexts[2]}${cards[2].keywords?.slice(0, 2).join("、")}的启示将照亮前行的道路。

愿星辰指引你的脚步，在命运的织锦中找到属于自己的图案。

—— 神秘的塔罗守护者`;
};

export default interpretReading;
