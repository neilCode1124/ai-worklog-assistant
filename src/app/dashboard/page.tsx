'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { StatsCard } from '@/components/charts/StatsCard'
import { RecentTasks } from '@/components/RecentTasks'

export default function Dashboard() {
  const [stats] = useState({
    todayCompleted: 3,
    weekCompleted: 15,
    blockedTasks: 2,
    streakDays: 5
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐱</span>
            <h1 className="text-xl font-bold">AI工作日志助手</h1>
          </div>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-blue-600 font-medium">首页</a>
            <a href="/worklogs" className="text-gray-600 hover:text-gray-900">历史记录</a>
            <a href="/settings" className="text-gray-600 hover:text-gray-900">设置</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="今日完成"
            value={stats.todayCompleted}
            icon="✅"
            trend="+1"
          />
          <StatsCard 
            title="本周完成"
            value={stats.weekCompleted}
            icon="📊"
            trend="+5"
          />
          <StatsCard 
            title="阻塞任务"
            value={stats.blockedTasks}
            icon="⏳"
            alert={stats.blockedTasks > 0}
          />
          <StatsCard 
            title="连续记录"
            value={`${stats.streakDays}天`}
            icon="🔥"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border h-[600px]">
              <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                <h2 className="font-semibold flex items-center gap-2">
                  <span>💬</span>
                  和小虎聊聊今天的工作
                </h2>
              </div>
              <ChatInterface />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span>🌅</span>
                今日总结
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>no-mandate字段调整完成</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500">!</span>
                  <span>process结果页等待产品反馈</span>
                </div>
              </div>
              <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
                查看详情
              </button>
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span>📝</span>
                最近任务
              </h3>
              <RecentTasks />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold mb-3">快捷操作</h3>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 text-left rounded-lg hover:bg-gray-50 border transition flex items-center gap-2">
                  <span>📄</span>
                  生成本周周报
                </button>
                <button className="w-full py-2 px-4 text-left rounded-lg hover:bg-gray-50 border transition flex items-center gap-2">
                  <span>📊</span>
                  查看数据分析
                </button>
                <button className="w-full py-2 px-4 text-left rounded-lg hover:bg-gray-50 border transition flex items-center gap-2">
                  <span>⚙️</span>
                  提醒设置
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
