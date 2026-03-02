"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Dashboard() {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: t("greeting"),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessage = {
      role: "user" as const,
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          sessionId: "test-session",
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: t("error_message"),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#134E4A]">{t("app_name")}</h1>
              <div className="text-sm text-[#134E4A]/70">{new Date().toLocaleDateString()}</div>
            </div>

            <div className="h-[500px] overflow-y-auto mb-6 p-4 bg-[#F0FDFA] rounded-xl">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-6 ${message.role === "user" ? "flex justify-end" : "flex"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      message.role === "user"
                        ? "bg-[#0D9488] text-white rounded-tr-none"
                        : "bg-white shadow-sm rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={t("input_placeholder")}
                className="flex-1 px-4 py-3 bg-[#F0FDFA] border border-[#14B8A6]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-3 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] transition-colors duration-200 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-[#134E4A]/70">
            <p>{t("tip")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
