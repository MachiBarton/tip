# 神秘塔罗 (The Mystic Tarot)

一个基于 Next.js 构建的交互式塔罗牌占卜应用，融合神秘学美学与现代 Web 技术。

![塔罗牌应用截图](./screenshot.png)

## ✨ 功能特性

- 🔮 **三牌阵占卜** - 经典的时间之流牌阵（过去、现在、未来）
- 🎴 **全牌组支持** - 包含 78 张塔罗牌（22 张大阿卡纳 + 56 张小阿卡纳）
- 🃏 **正逆位解读** - 支持牌面正位与逆位的不同含义解读
- 📜 **AI 智能解牌** - 基于用户问题和牌阵提供个性化解读
- 📚 **历史记录** - 保存占卜记录，随时回顾过往解读
- 🎨 **神秘学美学** - 深色主题配合金色点缀，营造神秘氛围
- ✨ **流畅动画** - 洗牌、翻牌等交互动画增强沉浸感

## 🛠️ 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **组件库**: shadcn/ui + Radix UI
- **动画**: Framer Motion
- **状态管理**: Zustand
- **图标**: Lucide React

## 🚀 快速开始

### 环境要求

- Node.js 20+
- npm / yarn / pnpm

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env.local` 文件：

```env
# 如果需要 AI 解牌功能，配置相应的 API Key
OPENAI_API_KEY=your_api_key_here
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:8112 运行

### 构建生产版本

```bash
npm run build
```

构建输出位于 `dist` 目录。

## 📁 项目结构

```
.
├── app/                    # Next.js App Router
│   ├── components/         # 页面组件
│   ├── data/              # 塔罗牌数据
│   ├── hooks/             # 自定义 Hooks
│   ├── services/          # 服务层（AI 解牌等）
│   ├── types/             # TypeScript 类型定义
│   ├── history/           # 历史记录页面
│   ├── reading/           # 占卜页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 通用 UI 组件
├── lib/                   # 工具函数
├── public/                # 静态资源
│   └── tarot/            # 塔罗牌图片
├── dist/                  # 构建输出
└── next.config.ts         # Next.js 配置
```

## 🎴 塔罗牌组

### 大阿卡纳 (22张)
愚者、魔术师、女祭司、皇后、皇帝、教皇、恋人、战车、力量、隐士、命运之轮、正义、倒吊人、死神、节制、恶魔、塔、星星、月亮、太阳、审判、世界

### 小阿卡纳 (56张)
- **权杖** (Wands) - 火元素，代表行动与创造力
- **圣杯** (Cups) - 水元素，代表情感与关系
- **宝剑** (Swords) - 风元素，代表思想与挑战
- **星币** (Pentacles) - 土元素，代表物质与事业

## 📝 使用说明

1. **开始占卜** - 点击首页「开始占卜」按钮
2. **专注思考** - 在心中默念你想要询问的问题
3. **洗牌抽牌** - 点击洗牌按钮，感受与牌的连接
4. **翻开牌面** - 依次翻开三张牌，揭示过去、现在、未来
5. **查看解读** - 阅读 AI 生成的个性化牌阵解读
6. **保存记录** - 占卜结果自动保存到历史档案

## 🔧 自定义配置

### 修改端口

在 `package.json` 中修改 dev 脚本：

```json
"dev": "next dev -p 8112"
```

### 静态导出配置

`next.config.ts` 已配置为静态导出模式：

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
```

## 📄 许可证

MIT License

---

*"As above, so below" - 如其在上，如其在下*
