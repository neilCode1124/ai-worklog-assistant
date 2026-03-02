# 快速开始

## 环境要求

- Node.js >= 18
- PostgreSQL >= 14
- OpenAI API Key (或 文心一言/通义千问)

## 1. 克隆项目

```bash
git clone https://github.com/yourusername/ai-worklog-assistant.git
cd ai-worklog-assistant
```

## 2. 安装依赖

```bash
npm install
# 或使用 pnpm
pnpm install
```

## 3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`:

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/worklog"

# NextAuth 认证
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (可选)
GITHUB_CLIENT_ID="your-github-id"
GITHUB_CLIENT_SECRET="your-github-secret"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# AI API
OPENAI_API_KEY="sk-your-openai-key"
# 或
ANTHROPIC_API_KEY="your-claude-key"
```

## 4. 初始化数据库

```bash
# 生成 Prisma Client
npx prisma generate

# 执行数据库迁移
npx prisma migrate dev --name init

# (可选) 填充示例数据
npx prisma db seed
```

## 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

---

## Docker 一键部署

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f app
```

---

## 项目结构

```
ai-worklog-assistant/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API Routes
│   │   ├── (auth)/         # 认证页面
│   │   ├── dashboard/      # 主界面
│   │   └── worklogs/       # 工作日志页面
│   ├── components/         # React组件
│   │   ├── ui/            # shadcn/ui 组件
│   │   ├── chat/          # 聊天组件
│   │   └── charts/        # 图表组件
│   ├── lib/               # 工具函数
│   │   ├── prisma.ts      # 数据库客户端
│   │   ├── openai.ts      # AI服务
│   │   └── utils.ts       # 通用工具
│   └── types/             # TypeScript类型
├── prisma/
│   └── schema.prisma      # 数据库模型
├── docs/                  # 文档
└── docker-compose.yml     # Docker配置
```

---

## 核心功能演示

### 1. 记录工作（对话方式）

```
用户: 今天搞定了登录接口，但是支付模块有问题

AI: ✅ 收到！已记录：
    - 完成：登录接口
    - 阻塞：支付模块问题

    能说说遇到什么问题了？我可以帮你分析
```

### 2. 查看总结（每天早上9点自动推送）

```
🌅 早上好！昨日回顾：

✅ 已完成：
  · 登录接口开发

⏳ 待跟进：
  · 支付模块问题（建议今天找后端对齐）

💡 今日建议：
  上午优先解决阻塞项，避免影响进度
```

### 3. 周报自动生成

每周一上午自动发送：

- 本周完成情况统计
- 关键成果 highlights
- 下周计划建议
- 效率趋势分析

---

## 自定义配置

### 修改提醒时间

编辑 `src/lib/config.ts`:

```typescript
export const DEFAULT_SETTINGS = {
  reminderTime: "09:00", // 改为你的偏好时间
  weeklyReportDay: 1, // 周一 = 1
  timezone: "Asia/Shanghai",
};
```

### 更换 AI 模型

编辑 `src/lib/openai.ts`:

```typescript
// 使用 Claude
const model = "claude-3-opus-20240229";

// 或使用国产模型
const model = "qwen-turbo"; // 通义千问
const model = "ernie-bot"; // 文心一言
```

---

## 开发指南

### 添加新 API

1. 在 `src/app/api/` 下创建路由文件
2. 使用 `src/lib/auth.ts` 进行权限验证
3. 参考现有 API 的响应格式

示例:

```typescript
// src/app/api/tasks/route.ts
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
  });

  return Response.json({ data: tasks });
}
```

### 添加新页面

1. 在 `src/app/` 下创建目录
2. 使用 `page.tsx` 作为入口
3. 使用 `layout.tsx` 定义布局

### 数据库变更

```bash
# 修改 schema.prisma 后执行
npx prisma migrate dev --name add_new_field

# 更新 Prisma Client
npx prisma generate
```

---

## 部署到生产

### Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel login
vercel --prod
```

### 自托管

```bash
# 构建
npm run build

# 启动
npm start
```

---

## 常见问题

**Q: 如何备份数据？**

```bash
pg_dump $DATABASE_URL > backup.sql
```

**Q: 如何重置数据库？**

```bash
npx prisma migrate reset
```

**Q: AI 调用失败怎么办？**

- 检查 API Key 是否正确
- 查看 OpenAI 控制台用量
- 尝试切换备用模型

---

## 贡献指南

欢迎提交 PR！请遵循以下规范：

1. Fork 本仓库
2. 创建 feature 分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

---

_有问题？提 Issue 或联系 maintainer_
