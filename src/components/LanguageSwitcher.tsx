"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <span className="text-white text-sm">{i18n.language === "zh" ? "中文" : "English"}</span>
        <span className="text-white">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-10">
          <button
            onClick={() => changeLanguage("zh")}
            className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === "zh" ? "bg-indigo-100 text-indigo-800" : "text-gray-700 hover:bg-gray-100"}`}
          >
            中文
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === "en" ? "bg-indigo-100 text-indigo-800" : "text-gray-700 hover:bg-gray-100"}`}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}
