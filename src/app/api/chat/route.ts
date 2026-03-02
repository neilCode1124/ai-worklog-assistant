import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import prisma from "@/lib/prisma";

const modelName = process.env.MODEL_NAME || "gpt-4";
const apiKey = process.env.LLM_API_KEY;
const baseUrl = process.env.LLM_BASE_URL;

const aiClient = new OpenAI({
  apiKey: apiKey,
  baseURL: baseUrl || undefined,
});

export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json();

    const response = await aiClient.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: "user",
          content: `请从以下工作描述中提取工作事项，以JSON格式返回。

工作描述：${message}

返回格式示例：
{"items": [{"content": "完成了用户登录功能", "status": "completed"}, {"content": "正在开发支付模块", "status": "in_progress"}, {"content": "等待API文档", "status": "blocked", "reason": "后端未提供"}]}

状态说明：
- completed: 已完成的事项（关键词：搞定、完成、做完了、解决了）
- in_progress: 正在进行的事项（关键词：正在、在做、开发中）
- blocked: 被阻塞的事项（关键词：等待、卡住、遇到问题、阻塞）

请只返回JSON，不要其他内容。`,
        },
      ],
    });

    const responseContent = response.choices[0].message.content || "{}";
    
    let parsedItems;
    try {
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedItems = JSON.parse(jsonMatch[0]);
      } else {
        parsedItems = { items: [] };
      }
    } catch {
      parsedItems = { items: [] };
    }

    const reply = generateReply(parsedItems.items || []);

    return NextResponse.json({
      reply,
      parsedItems: parsedItems.items || [],
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "处理消息时发生错误" }, { status: 500 });
  }
}

function generateReply(items: any[]) {
  if (items.length === 0) {
    return '我没理解你的工作内容，请再详细描述一下吧！';
  }

  const completed = items.filter((item) => item.status === 'completed');
  const inProgress = items.filter((item) => item.status === 'in_progress');
  const blocked = items.filter((item) => item.status === 'blocked');

  let reply = '收到！';

  if (completed.length > 0) {
    reply += `\n✅ 已完成：${completed.map((item) => item.content).join('、')}`;
  }

  if (inProgress.length > 0) {
    reply += `\n⏳ 进行中：${inProgress.map((item) => item.content).join('、')}`;
  }

  if (blocked.length > 0) {
    reply += `\n⚠️  阻塞：${blocked.map((item) => item.content).join('、')}`;
  }

  reply += '\n还有其他事项吗？';
  return reply;
}
