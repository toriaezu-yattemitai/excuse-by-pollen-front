"use client";

import { useState } from "react";

/**
 * 左側の入力パネルコンポーネント
 */
export default function LeftPanel() {
  const [target, setTarget] = useState("");
  const [symptom, setSymptom] = useState("");
  const [situation, setSituation] = useState("");
  const [level, setLevel] = useState(3);
  const [nuance, setNuance] = useState("ポエム風");

  const handleSubmit = () => {
    // TODO: ここで生成APIを呼び出す
    console.log({ target, symptom, situation, level, nuance });
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        {/* 相手入力 */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">
            相手
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-700"
            placeholder="例：上司、先生"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>

        {/* 症状入力 */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">
            症状
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-700"
            placeholder="例：鼻水が止まらない"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
          />
        </div>

        {/* 状況入力 */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">
            状況
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-700"
            placeholder="例：大事な会議前"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
          />
        </div>

        {/* 花粉症レベル */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-gray-700">
              花粉症レベル
            </label>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
              {level}
            </div>
          </div>
          <div className="px-1">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </div>

        {/* ニュアンス/文体 */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">
            ニュアンス/文体
          </label>
          <div className="relative">
            <select
              value={nuance}
              onChange={(e) => setNuance(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 pr-10 cursor-pointer"
            >
              <option value="ポエム風">ポエム風</option>
              <option value="ビジネスライク">ビジネスライク</option>
              <option value="深刻">深刻</option>
              <option value="軽いタッチ">軽いタッチ</option>
              <option value="ユーモア">ユーモア</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 生成ボタン */}
      <div className="pt-6 mt-4 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
        >
          <span>言い訳を生成する</span>
        </button>
      </div>
    </div>
  );
}
