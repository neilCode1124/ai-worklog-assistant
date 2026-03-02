"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#F0FDFA] font-['Plus Jakarta Sans',sans-serif]">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm z-50 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#0D9488] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <span className="text-xl font-bold text-[#134E4A]">{t("app_name")}</span>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#134E4A] mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-[#134E4A]/80 mb-10 max-w-3xl mx-auto">{t("subtitle")}</p>

          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] transition-colors duration-200 transform hover:scale-105 font-medium"
          >
            {t("start_using")}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#0D9488]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#134E4A] mb-2">{t("feature1")}</h3>
              <p className="text-[#134E4A]/70 text-sm">像聊天一样记录工作，无需填写复杂表单</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#0D9488]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#134E4A] mb-2">{t("feature2")}</h3>
              <p className="text-[#134E4A]/70 text-sm">AI 智能解析工作内容，自动分类和整理</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#0D9488]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#134E4A] mb-2">{t("feature3")}</h3>
              <p className="text-[#134E4A]/70 text-sm">自动生成日报、周报，节省时间和精力</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#0D9488]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#134E4A] mb-2">{t("feature4")}</h3>
              <p className="text-[#134E4A]/70 text-sm">智能提醒阻塞事项，确保工作顺利进行</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-[#0D9488]/5 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-[#134E4A] mb-6">开始使用 AI 工作日志助手</h2>
          <p className="text-[#134E4A]/80 mb-8 max-w-2xl mx-auto">
            提升工作效率，让记录变得简单有趣。立即开始使用，体验 AI 带来的智能工作方式。
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] transition-colors duration-200 transform hover:scale-105 font-medium"
          >
            {t("common:start_using")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#134E4A]/70 text-sm">{t("footer")}</p>
        </div>
      </footer>
    </div>
  );
}
