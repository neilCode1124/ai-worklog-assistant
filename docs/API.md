# API 设计文档

## 基础信息

- **Base URL**: `/api/v1`
- **认证方式**: JWT Token (Bearer)
- **Content-Type**: `application/json`

---

## 认证相关

### POST `/auth/register`

用户注册

**Request:**

```json
{
  "email": "user@example.com",
  "password": "string",
  "name": "string"
}
```

**Response:**

```json
{
  "user": {
    "id": "string",
    "email": "user@example.com",
    "name": "string"
  },
  "token": "jwt_token"
}
```

### POST `/auth/login`

用户登录

**Request:**

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

**Response:**

```json
{
  "user": { ... },
  "token": "jwt_token"
}
```

### GET `/auth/github`

GitHub OAuth 登录（跳转）

### GET `/auth/google`

Google OAuth 登录（跳转）

---

## 工作日志

### GET `/worklogs`

获取工作日志列表

**Query Parameters:**

- `startDate` (optional): ISO日期格式，如 `2026-03-01`
- `endDate` (optional): ISO日期格式
- `page` (optional): 页码，默认 1
- `limit` (optional): 每页数量，默认 20

**Response:**

```json
{
  "data": [
    {
      "id": "string",
      "date": "2026-03-02",
      "summary": "AI生成的总结...",
      "completedCount": 3,
      "blockedCount": 1,
      "createdAt": "2026-03-02T18:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### GET `/worklogs/:date`

获取指定日期的工作日志

**Params:**

- `date`: 日期格式 `YYYY-MM-DD`

**Response:**

```json
{
  "id": "string",
  "date": "2026-03-02",
  "content": "原始对话内容...",
  "summary": "AI总结...",
  "tasks": [
    {
      "id": "string",
      "title": "完成登录接口",
      "status": "completed",
      "tags": ["backend", "api"]
    }
  ],
  "stats": {
    "completed": 3,
    "inProgress": 2,
    "blocked": 1
  }
}
```

### POST `/worklogs`

创建工作日志（通过自然对话）

**Request:**

```json
{
  "content": "今天搞定了no-mandate字段调整，但是process结果页还有问题，已经反馈给产品了",
  "date": "2026-03-02" // optional，默认今天
}
```

**Response:**

```json
{
  "id": "string",
  "date": "2026-03-02",
  "parsedTasks": [
    {
      "id": "task_1",
      "title": "no-mandate字段调整",
      "status": "completed",
      "confidence": 0.95
    },
    {
      "id": "task_2",
      "title": "process结果页问题修复",
      "status": "blocked",
      "blockReason": "等待产品反馈",
      "confidence": 0.88
    }
  ],
  "summary": "今日完成no-mandate字段调整，process结果页问题已反馈产品等待响应。",
  "suggestions": ["建议明天主动跟进产品进度"]
}
```

### PUT `/worklogs/:id`

更新工作日志

**Request:**

```json
{
  "content": "更新的内容...",
  "summary": "手动修改的总结..."
}
```

### DELETE `/worklogs/:id`

删除工作日志

---

## 任务管理

### GET `/tasks`

获取任务列表

**Query Parameters:**

- `status` (optional): `completed` | `in_progress` | `blocked` | `all`
- `tag` (optional): 标签筛选
- `priority` (optional): `low` | `medium` | `high`
- `search` (optional): 关键词搜索
- `page`, `limit`

**Response:**

```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "in_progress",
      "priority": "high",
      "tags": ["frontend"],
      "deadline": "2026-03-05T00:00:00Z",
      "createdAt": "2026-03-01T10:00:00Z"
    }
  ],
  "stats": {
    "total": 50,
    "completed": 30,
    "inProgress": 15,
    "blocked": 5
  }
}
```

### GET `/tasks/:id`

获取单个任务详情

### POST `/tasks`

创建任务

**Request:**

```json
{
  "title": "string",
  "description": "string",
  "status": "in_progress",
  "priority": "medium",
  "tags": ["string"],
  "deadline": "2026-03-05T00:00:00Z",
  "remindAt": "2026-03-04T09:00:00Z"
}
```

### PUT `/tasks/:id`

更新任务

**Request:**

```json
{
  "status": "completed",
  "completedAt": "2026-03-02T15:00:00Z"
}
```

### PUT `/tasks/:id/block`

标记任务为阻塞

**Request:**

```json
{
  "reason": "等待后端接口",
  "action": "已发邮件催促"
}
```

### PUT `/tasks/:id/unblock`

解除阻塞状态

### DELETE `/tasks/:id`

删除任务

---

## AI 对话

### POST `/ai/chat`

与AI助手对话（记录工作）

**Request:**

```json
{
  "message": "今天完成了登录功能，但是支付模块遇到个问题",
  "context": {
    "date": "2026-03-02",
    "previousMessages": []
  }
}
```

**Response:**

```json
{
  "reply": "收到！我帮你记录一下：\n\n✅ 已完成：登录功能\n⏳ 阻塞中：支付模块问题\n\n能详细说说支付模块遇到什么问题了？",
  "parsedData": {
    "tasks": [
      { "title": "登录功能", "status": "completed" },
      { "title": "支付模块问题", "status": "blocked" }
    ]
  },
  "shouldSave": false // 是否自动保存到工作日志
}
```

### POST `/ai/summarize`

生成工作总结

**Request:**

```json
{
  "type": "daily", // daily | weekly | monthly
  "date": "2026-03-02",
  "workLogId": "string" // optional
}
```

**Response:**

```json
{
  "summary": "markdown格式的总结...",
  "keyPoints": ["要点1", "要点2"],
  "suggestions": ["建议1", "建议2"],
  "stats": {
    "completed": 3,
    "blocked": 1
  }
}
```

### POST `/ai/suggest`

获取工作建议

**Request:**

```json
{
  "context": "最近一周有3个任务被阻塞"
}
```

**Response:**

```json
{
  "suggestions": [
    {
      "type": "warning",
      "message": "本周阻塞率较高(30%)，建议优先解决阻塞项",
      "action": "查看阻塞任务"
    },
    {
      "type": "tip",
      "message": "上午9-11点是你最高效的时间段",
      "action": "把重要任务安排在这个时段"
    }
  ]
}
```

---

## 报告生成

### GET `/reports`

获取报告列表

**Query Parameters:**

- `type`: `weekly` | `monthly` | `quarterly`
- `year`: 年份
- `page`, `limit`

### GET `/reports/:id`

获取单个报告

**Response:**

```json
{
  "id": "string",
  "type": "weekly",
  "startDate": "2026-02-24",
  "endDate": "2026-03-02",
  "content": "# 周报\n\n## 完成情况...",
  "stats": {
    "completed": 15,
    "blocked": 3,
    "completionRate": 83
  },
  "createdAt": "2026-03-02T09:00:00Z"
}
```

### POST `/reports/generate`

生成新报告

**Request:**

```json
{
  "type": "weekly",
  "startDate": "2026-02-24",
  "endDate": "2026-03-02"
}
```

### GET `/reports/:id/export`

导出报告（PDF/Markdown）

**Query Parameters:**

- `format`: `pdf` | `markdown`

---

## 统计与分析

### GET `/stats/overview`

获取数据概览

**Response:**

```json
{
  "thisWeek": {
    "completed": 12,
    "blocked": 2,
    "completionRate": 85
  },
  "lastWeek": {
    "completed": 10,
    "blocked": 3,
    "completionRate": 77
  },
  "trend": "up", // up | down | stable
  "streakDays": 5 // 连续记录天数
}
```

### GET `/stats/trends`

获取趋势数据

**Query Parameters:**

- `metric`: `completion` | `productivity` | `blocking`
- `period`: `7d` | `30d` | `90d`

**Response:**

```json
{
  "labels": ["周一", "周二", "周三", "周四", "周五"],
  "datasets": [
    {
      "label": "完成任务数",
      "data": [3, 4, 2, 5, 3]
    }
  ]
}
```

### GET `/stats/tags`

获取标签统计

**Response:**

```json
{
  "tags": [
    { "name": "frontend", "count": 15, "color": "#3b82f6" },
    { "name": "backend", "count": 12, "color": "#22c55e" },
    { "name": "design", "count": 5, "color": "#f59e0b" }
  ]
}
```

---

## 用户设置

### GET `/settings`

获取用户设置

**Response:**

```json
{
  "theme": "system", // light | dark | system
  "language": "zh-CN",
  "aiModel": "gpt-4",
  "reminderTime": "09:00",
  "notifications": {
    "dailySummary": true,
    "blockReminder": true,
    "weeklyReport": true
  }
}
```

### PUT `/settings`

更新用户设置

---

## WebSocket (实时功能)

连接: `wss://api.example.com/ws?token=JWT_TOKEN`

### 事件类型

#### `chat.message`

AI对话实时流式响应

```json
{
  "type": "chat.message",
  "data": {
    "chunk": "部分回复内容...",
    "isComplete": false
  }
}
```

#### `notification`

系统通知推送

```json
{
  "type": "notification",
  "data": {
    "title": "早上好！",
    "body": "昨日工作总结已生成",
    "link": "/worklogs/2026-03-02"
  }
}
```

---

## 错误处理

统一错误格式:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数错误",
    "details": [{ "field": "email", "message": "邮箱格式不正确" }]
  }
}
```

### 错误码

| Code               | HTTP Status | 说明             |
| ------------------ | ----------- | ---------------- |
| `UNAUTHORIZED`     | 401         | 未授权，需要登录 |
| `FORBIDDEN`        | 403         | 无权限访问       |
| `NOT_FOUND`        | 404         | 资源不存在       |
| `VALIDATION_ERROR` | 422         | 参数验证失败     |
| `RATE_LIMIT`       | 429         | 请求过于频繁     |
| `INTERNAL_ERROR`   | 500         | 服务器内部错误   |

---

_文档版本: v1.0_
_最后更新: 2026-03-02_
