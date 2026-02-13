import { DrawnCard } from "../types";

const API_URL = "https://api.moonshot.cn/v1/chat/completions";
const API_KEY = process.env.NEXT_PUBLIC_KIMI_API_KEY || "";

export const interpretReading = async (
  question: string,
  cards: DrawnCard[],
): Promise<string> => {
  // 如果没有API密钥，直接返回模拟解读
  if (!API_KEY) {
    console.log("No API key, using mock interpretation");
    return generateMockInterpretation(question, cards);
  }

  const prompt = `你是一位深谙神秘学的塔罗牌大师，拥有中世纪时代的优雅文风。
请基于以下三张牌阵为用户提供解读：

占卜问题："${question || "寻求命运的指引"}"

牌阵：
1. 过去/根源：${cards[0]?.nameCN}(${cards[0]?.isReversed ? "逆位" : "正位"}) - 关键词：${cards[0]?.keywords?.join("、")}
2. 现在/挑战：${cards[1]?.nameCN}(${cards[1]?.isReversed ? "逆位" : "正位"}) - 关键词：${cards[1]?.keywords?.join("、")}
3. 未来/指引：${cards[2]?.nameCN}(${cards[2]?.isReversed ? "逆位" : "正位"}) - 关键词：${cards[2]?.keywords?.join("、")}

要求：
- 使用神秘而优雅的中世纪英语风格（翻译成中文）
- 结合牌面元素、数字学、炼金术象征
- 提供具体建议，避免过于笼统
- 长度控制在 300-400 字
- 以"亲爱的求问者"开头
- 最后一定要根据提问作出总结回答`;

  try {
    console.log("Calling AI API...");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "moonshot-v1-8k",
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
