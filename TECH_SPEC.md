# 技术规格文档

## AI工作日志助手

**版本**: v1.0  
**日期**: 2026-03-02

---

## 1. 技术架构

### 1.1 整体架构

```
┌─────────────────┐
│   Next.js 应用   │  ← 用户入口
└────────┬────────┘
         │ HTTPS
┌────────▼────────┐
│   API Routes    │  ← 统一接入层
└────────┬────────┘
         │
┌────────▼────────┐
│  Node.js服务    │  ← 业务逻辑
│  (Next.js API)  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐  ┌──▼────┐
│ SQLite│  │ Redis │  ← 数据层
└───────┘  └───────┘
    │
┌───▼───────────┐
│ OpenAI API    │  ← AI能力
│ (GPT-4/Claude)│
└───────────────┘
```

### 1.2 技术选型理由

| 组件   | 选择               | 理由                                          |
| ------ | ------------------ | --------------------------------------------- |
| 前端   | Next.js 14         | 开源影响力大、SEO友好、全栈能力强、开发效率高 |
| 后端   | Next.js API Routes | 与前端同构、部署简单、TypeScript支持好        |
| 数据库 | SQLite/PostgreSQL  | Prisma ORM支持、易于部署、性能稳定            |
| 缓存   | Redis              | 会话管理、定时任务队列                        |
| AI     | OpenAI API         | 中文理解好、API稳定                           |
| 部署   | Vercel/Netlify     | 一键部署、自动缩放、全球CDN                   |

---

## 2. 数据库设计

### 2.1 Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  name         String?
  avatar       String?
  reminderTime String   @default("09:00")
  aiPersonality String  @default("lively")
  summaryTemplate String @default("default")
  worklogs     Worklog[]
  blockers     Blocker[]
  reminders    Reminder[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Worklog {
  id              String       @id @default(cuid())
  userId          String
  date            String       // YYYY-MM-DD
  items           Json         // Array of work items
  summary         Json?        // AI-generated summary
  rawConversation String?      // Raw conversation history
  user            User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  blockers        Blocker[]
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}

model Blocker {
  id            String   @id @default(cuid())
  userId        String
  worklogId     String
  content       String
  status        String   @default("active") // active / resolved / expired
  daysBlocked   Int      @default(0)
  lastRemindedAt DateTime?
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  worklog       Worklog  @relation(fields: [worklogId], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())
  resolvedAt    DateTime?
}

model Reminder {
  id          String   @id @default(cuid())
  userId      String
  type        String   // daily_summary / blocker_alert / weekly_report
  scheduledAt DateTime
  sentAt      DateTime?
  content     String
  status      String   @default("pending") // pending / sent / failed
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 3. API 接口设计

### 3.1 核心接口

#### POST /api/chat

**描述**: 处理用户对话，解析工作事项

**请求**:

```json
{
  "message": "今天完成了登录接口",
  "sessionId": "uuid"
}
```

**响应**:

```json
{
  "reply": "收到！✅ 已完成：登录接口\n还有其他事项吗？",
  "parsedItems": [
    {
      "content": "登录接口",
      "status": "completed"
    }
  ]
}
```

#### GET /api/worklogs/[date]

**描述**: 获取指定日期的工作日志

**响应**:

```json
{
  "date": "2026-03-02",
  "items": [...],
  "summary": {...}
}
```

#### GET /api/summary/daily

**描述**: 生成每日总结

**响应**:

```json
{
  "date": "2026-03-02",
  "completed": ["..."],
  "blocked": ["..."],
  "suggestions": "..."
}
```

#### GET /api/blockers

**描述**: 获取当前阻塞项列表

**响应**:

```json
{
  "blockers": [
    {
      "id": "uuid",
      "content": "...",
      "daysBlocked": 3,
      "status": "active"
    }
  ]
}
```

### 3.2 API Routes 结构

```
/src/app/api/
├── chat/route.ts         # POST /api/chat
├── worklogs/[date]/route.ts  # GET /api/worklogs/[date]
├── summary/daily/route.ts  # GET /api/summary/daily
├── blockers/route.ts      # GET /api/blockers
└── auth/
    └── [...nextauth]/route.ts  # 认证路由
```

---

## 4. AI Prompt 设计

### 4.1 对话解析 Prompt

```
你是一个工作日志助手。请从用户的自然语言描述中提取工作事项。

输入：用户的对话内容
输出格式（JSON）：
{
  "items": [
    {
      "content": "事项描述",
      "status": "completed|in_progress|blocked",
      "reason": "如果是blocked，说明原因"
    }
  ]
}

规则：
1. 自动识别完成状态关键词（搞定、完成、做完了 → completed）
2. 识别阻塞关键词（遇到问题、等待、卡住了 → blocked）
3. 一个句子可能包含多个事项，要拆分
4. 保持简洁，不要过度解读
```

### 4.2 每日总结 Prompt

```
基于用户昨天的工作日志，生成一份友好的总结报告。

输入：昨日工作事项列表
输出要求：
1. 用emoji让内容更生动
2. 列出已完成和未完成事项
3. 对阻塞项给出具体行动建议
4. 语气要积极鼓励
5. 控制在300字以内

格式：
🌅 早上好！昨日工作回顾：

✅ 已完成：
- ...

⏳ 待跟进：
- ...

💡 今日建议：
...
```

---

## 5. 定时任务设计

### 5.1 任务调度

使用 node-cron 实现：

```javascript
// src/app/api/cron/route.ts
import { NextResponse } from "next/server";
import cron from "node-cron";

// 每天早上9点推送日报
cron.schedule("0 9 * * 1-5", async () => {
  await generateDailySummaries();
});

// 每天下午6点检查阻塞项
cron.schedule("0 18 * * *", async () => {
  await checkAndRemindBlockers();
});

// 每周一上午10点推送周报
cron.schedule("0 10 * * 1", async () => {
  await generateWeeklyReports();
});

export async function GET() {
  return NextResponse.json({ message: "Cron jobs initialized" });
}
```

### 5.2 消息提醒

使用以下方式实现提醒：

- **站内通知**：在应用内显示通知中心
- **邮件提醒**：发送邮件到用户注册邮箱
- **浏览器通知**：使用 Web Push API
- **移动端**：可通过 PWA 实现推送通知

#### 通知中心设计

```typescript
// src/app/components/NotificationCenter.tsx
import { useState, useEffect } from 'react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // 从 API 获取通知
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  return (
    <div className="notification-center">
      {notifications.map(notification => (
        <div key={notification.id} className="notification">
          <p>{notification.content}</p>
          <span>{notification.createdAt}</span>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
```

---

## 6. 安全考虑

### 6.1 数据安全

- 数据库密码加密存储
- API接口HTTPS强制
- 敏感字段（openid）不返回给前端

### 6.2 访问控制

- JWT Token验证
- 用户只能访问自己的数据
- API限流防刷

---

_文档结束_
