# AI Worklog Assistant 🤖📝

> Transform your daily work conversations into organized insights. An AI-powered work log that feels like talking to a friend.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)

[English](#english) | [中文](#中文)

---

## 🌟 Features

### Core Features

- 💬 **Natural Conversation** - Record work by chatting, no forms to fill
- 🔔 **Smart Reminders** - Daily summaries at 9 AM, never miss follow-ups
- 📊 **Auto Reports** - Weekly/Monthly reports generated automatically
- 🧠 **Blocker Tracking** - AI identifies and reminds you of blocked tasks
- 🔒 **Privacy First** - Your data is encrypted and yours alone

### Why This?

| Feature       | Notion AI  | Feishu          | **AI Worklog Assistant**     |
| ------------- | ---------- | --------------- | ---------------------------- |
| Input Method  | Write docs | Meeting records | **Chat naturally**           |
| Reminders     | ❌         | ❌              | **✅ Proactive alerts**      |
| Task Tracking | ❌         | ❌              | **✅ Blocker detection**     |
| Personality   | Cold tool  | Cold tool       | **✅ Friendly AI companion** |
| Open Source   | ❌ Closed  | ❌ Closed       | **✅ Fully open**            |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL 15+
- Docker (optional, for local database)

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/ai-worklog-assistant.git
cd ai-worklog-assistant

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration:
# - DATABASE_URL: PostgreSQL connection string
# - LLM_API_KEY: Your AI model API key
# - LLM_BASE_URL: API base URL (optional, for custom endpoints)
# - MODEL_NAME: Model name (e.g., gpt-4, deepseek-chat)

# 4. Start database (using Docker)
docker-compose up -d

# 5. Run database migrations
pnpm prisma migrate dev

# 6. Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### AI Model Configuration

The application supports any OpenAI-compatible API:

| Provider  | MODEL_NAME     | LLM_BASE_URL                      |
| --------- | -------------- | --------------------------------- |
| OpenAI    | gpt-4          | https://api.openai.com/v1         |
| DeepSeek  | deepseek-chat  | https://api.deepseek.com/v1       |
| Ollama    | llama2         | http://localhost:11434/v1         |
| Custom    | your-model     | your-api-endpoint                 |

---

## 🏗️ Architecture

```
ai-worklog-assistant/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API Routes
│   │   │   └── chat/     # Chat API endpoint
│   │   ├── dashboard/    # Main UI
│   │   └── page.tsx      # Landing page
│   ├── components/       # React Components
│   │   └── LanguageSwitcher.tsx
│   ├── lib/              # Utilities
│   │   └── prisma.ts     # Database client
│   └── i18n.ts           # i18n configuration
├── prisma/
│   ├── schema.prisma     # Database Schema
│   └── migrations/       # Database migrations
├── public/
│   └── locales/          # Translation files
│       ├── en/
│       └── zh/
└── docker-compose.yml    # Docker configuration
```

### Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) + [Prisma](https://www.prisma.io/)
- **AI**: OpenAI-compatible API (supports DeepSeek, Ollama, etc.)
- **i18n**: [react-i18next](https://react.i18next.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📖 Usage

### Daily Workflow

**1. Evening - Record Your Day**

```
You: "今天完成了登录API，但是支付集成卡住了，需要后端支持"

AI: "收到！
     ✅ 已完成：登录API
     ⏳ 进行中：支付集成（等待后端支持）

     还有其他事项吗？"
```

**2. Morning - Get Your Summary**

```
🌅 早上好！昨日回顾：

✅ 已完成：
   - 登录API

⏳ 需要跟进：
   - 支付集成（今天提醒后端？）

💡 建议：今天早上检查后端团队进度
```

**3. Monday - Weekly Report**

```
📊 周报 (3月1日-7日)

已完成：12项
进行中：3项
阻塞：1项

🏆 亮点：
   - Standing Order功能已上线
   - No-mandate字段设计已确认

📋 下周计划：
   1. 处理结果页面修复验证
   2. 我的收藏功能启动

📈 洞察：完成率85%（比上周+10%）
```

---

## 🛣️ Roadmap

### Phase 1: MVP (Current)

- [x] Project setup (Next.js 14 + TypeScript)
- [x] AI conversation interface
- [x] Work item extraction from natural language
- [x] Status recognition (completed/in_progress/blocked)
- [x] i18n support (Chinese/English)
- [x] Database setup (PostgreSQL + Prisma)
- [x] Docker configuration
- [x] Configurable AI model (OpenAI-compatible)
- [ ] User authentication (GitHub OAuth)
- [ ] Session persistence
- [ ] Daily summary generation

### Phase 2: Enhanced

- [ ] Weekly/Monthly reports
- [ ] Blocker reminders
- [ ] Data visualization
- [ ] Mobile responsive design
- [ ] Export to Markdown/PDF

### Phase 3: Advanced

- [ ] Team collaboration
- [ ] Slack/Discord integration
- [ ] Custom AI prompts
- [ ] Self-hosted LLM support
- [ ] Calendar integration

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- UI inspired by modern chat applications
- Built with love by developers, for developers ❤️

---

<p align="center">
  Made with 🐱 by 小虎
</p>

---

<a name="中文"></a>

## 中文介绍

### 核心功能

- 💬 **自然对话录入** - 像聊天一样记录工作，无需填表
- 🔔 **智能提醒** - 每天早上9点自动推送昨日总结和今日待办
- 📊 **自动生成报告** - 周报、月报一键生成
- 🧠 **阻塞项追踪** - AI自动识别被阻塞的任务并提醒跟进
- 🔒 **隐私优先** - 数据加密存储，仅属于你

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/yourusername/ai-worklog-assistant.git
cd ai-worklog-assistant

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入配置：
# - DATABASE_URL: PostgreSQL连接字符串
# - LLM_API_KEY: AI模型API密钥
# - LLM_BASE_URL: API地址（可选）
# - MODEL_NAME: 模型名称

# 启动数据库
docker-compose up -d

# 运行数据库迁移
pnpm prisma migrate dev

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

### AI模型配置

支持任何OpenAI兼容的API：

| 提供商     | MODEL_NAME     | LLM_BASE_URL                      |
| ---------- | -------------- | --------------------------------- |
| OpenAI     | gpt-4          | https://api.openai.com/v1         |
| DeepSeek   | deepseek-chat  | https://api.deepseek.com/v1       |
| Ollama     | llama2         | http://localhost:11434/v1         |
| 自定义     | your-model     | your-api-endpoint                 |

### 技术栈

- **框架**: Next.js 14 + TypeScript
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL + Prisma
- **AI**: OpenAI兼容API（支持DeepSeek、Ollama等）
- **国际化**: react-i18next
- **包管理**: pnpm

### 开发进度

#### Phase 1: MVP（当前阶段）

- [x] 项目搭建（Next.js 14 + TypeScript）
- [x] AI对话界面
- [x] 工作事项自然语言提取
- [x] 状态识别（已完成/进行中/阻塞）
- [x] 国际化支持（中英文）
- [x] 数据库配置（PostgreSQL + Prisma）
- [x] Docker环境配置
- [x] 可配置AI模型（OpenAI兼容接口）
- [ ] 用户认证（GitHub OAuth）
- [ ] 会话持久化
- [ ] 每日总结生成

### 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件
