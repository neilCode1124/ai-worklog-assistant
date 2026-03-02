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

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-worklog-assistant)

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/ai-worklog-assistant.git
cd ai-worklog-assistant

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# 4. Set up database
npx prisma migrate dev
npx prisma db seed

# 5. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture

```
ai-worklog-assistant/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API Routes
│   │   ├── dashboard/    # Main UI
│   │   └── chat/         # Chat interface
│   ├── components/       # React Components
│   ├── lib/              # Utilities
│   └── types/            # TypeScript Types
├── prisma/
│   └── schema.prisma     # Database Schema
├── docker/
│   └── docker-compose.yml
└── docs/                 # Documentation
```

### Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) + [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **AI**: OpenAI API / Claude API
- **Deployment**: [Vercel](https://vercel.com/) (recommended)

---

## 📖 Usage

### Daily Workflow

**1. Evening - Record Your Day**

```
You: "Today I finished the login API, but got stuck on
      payment integration. Need backend support."

AI: "Got it! 📋
     ✅ Completed: Login API
     ⏳ Blocked: Payment integration (waiting for backend)

     Anything else?"
```

**2. Morning - Get Your Summary**

```
🌅 Good morning! Yesterday's recap:

✅ Completed:
   - Login API

⏳ Follow-up needed:
   - Payment integration (ping backend today?)

💡 Suggestion: Check with backend team this morning
```

**3. Monday - Weekly Report**

```
📊 Weekly Summary (Mar 1-7)

Completed: 12 tasks
In Progress: 3 tasks
Blocked: 1 task

🏆 Highlights:
   - Standing Order feature shipped
   - No-mandate field design confirmed

📋 Next Week:
   1. Process result page fix verification
   2. My Favourites feature kickoff

📈 Insight: 85% completion rate (+10% vs last week)
```

---

## 🛣️ Roadmap

### Phase 1: MVP (Weeks 1-4)

- [x] Natural language input
- [x] Daily summaries
- [x] Basic task tracking
- [ ] GitHub OAuth
- [ ] Docker deployment

### Phase 2: Enhanced (Weeks 5-8)

- [ ] Weekly/Monthly reports
- [ ] Blocker reminders
- [ ] Data visualization
- [ ] Mobile responsive

### Phase 3: Advanced (Weeks 9-12)

- [ ] Team collaboration
- [ ] Slack/Discord integration
- [ ] Custom AI prompts
- [ ] Self-hosted LLM support

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

- Inspired by [OpenClaw](https://github.com/openclaw/openclaw) architecture
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Built with love by developers, for developers ❤️

---

## 📞 Contact

- Twitter: [@yourhandle](https://twitter.com/yourhandle)
- Email: your.email@example.com
- Discord: [Join our community](https://discord.gg/yourlink)

---

<p align="center">
  Made with 🐱 by小虎
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
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的API密钥

# 初始化数据库
npx prisma migrate dev

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 技术栈

- **框架**: Next.js 14 + TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **数据库**: PostgreSQL + Prisma
- **认证**: NextAuth.js
- **AI**: OpenAI API / Claude API
- **部署**: Vercel（推荐）

### 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件
