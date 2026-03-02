# 技术规格文档

## AI工作日志助手

**版本**: v1.0  
**日期**: 2026-03-02

---

## 1. 技术架构

### 1.1 整体架构

```
┌─────────────────┐
│   微信小程序    │  ← 用户入口
└────────┬────────┘
         │ HTTPS
┌────────▼────────┐
│   API Gateway   │  ← 统一接入层
└────────┬────────┘
         │
┌────────▼────────┐
│  Node.js服务    │  ← 业务逻辑
│  (Express)      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐  ┌──▼────┐
│MongoDB│  │ Redis │  ← 数据层
└───────┘  └───────┘
    │
┌───▼───────────┐
│ OpenAI API    │  ← AI能力
│ (GPT-4/Claude)│
└───────────────┘
```

### 1.2 技术选型理由

| 组件 | 选择 | 理由 |
|------|------|------|
| 前端 | 微信小程序 | 开发快、易传播、无需下载 |
| 后端 | Node.js + Express | 快速开发、生态丰富、适合实时通信 |
| 数据库 | MongoDB | Schema灵活，适合快速迭代 |
| 缓存 | Redis | 会话管理、定时任务队列 |
| AI | OpenAI API | 中文理解好、API稳定 |
| 部署 | 阿里云ECS | 国内访问快、成本可控 |

---

## 2. 数据库设计

### 2.1 集合结构

#### users - 用户表
```javascript
{
  _id: ObjectId,
  openid: String,           // 微信openid
  nickname: String,         // 昵称
  avatar: String,           // 头像URL
  settings: {
    reminderTime: "09:00",  // 提醒时间
    aiPersonality: "lively", // AI性格
    summaryTemplate: "default"
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### worklogs - 工作日志表
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  date: "2026-03-02",       // 日期
  items: [
    {
      id: "uuid",
      content: "完成登录接口",
      status: "completed",   // completed / in_progress / blocked
      tags: ["后端", "API"],
      createdAt: Date,
      updatedAt: Date
    }
  ],
  summary: {                // AI生成的总结
    completed: ["..."],
    blocked: ["..."],
    suggestions: "..."
  },
  rawConversation: String,  // 原始对话记录
  createdAt: Date,
  updatedAt: Date
}
```

#### blockers - 阻塞项追踪表
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  content: "支付模块待后端配合",
  sourceLogId: ObjectId,    // 来源日志
  status: "active",         // active / resolved / expired
  daysBlocked: 3,           // 已阻塞天数
  lastRemindedAt: Date,     // 上次提醒时间
  createdAt: Date,
  resolvedAt: Date
}
```

#### reminders - 提醒记录表
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: "daily_summary",    // daily_summary / blocker_alert / weekly_report
  scheduledAt: Date,        // 计划发送时间
  sentAt: Date,             // 实际发送时间
  content: String,          // 提醒内容
  status: "pending"         // pending / sent / failed
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

#### GET /api/worklogs/:date
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
// 每天早上9点推送日报
cron.schedule('0 9 * * 1-5', async () => {
  await generateDailySummaries();
});

// 每天下午6点检查阻塞项
cron.schedule('0 18 * * *', async () => {
  await checkAndRemindBlockers();
});

// 每周一上午10点推送周报
cron.schedule('0 10 * * 1', async () => {
  await generateWeeklyReports();
});
```

### 5.2 消息推送

使用微信订阅消息：
- 用户首次使用时申请订阅权限
- 定时触发时调用微信API推送

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

*文档结束*
