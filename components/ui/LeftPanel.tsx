"use client";

import { useState } from "react";
import Button from "./common/Button";
import TextBoxWithLabel from "./common/TextBoxWithLabel";
import NumberSliderWithLabel from "./common/NumberSliderWithLabel";
import SelectBoxWithLabel from "./common/SelectBoxWithLabel";
import type { GenerateRequest } from "@/types/api";

type LeftPanelProps = {
  onGenerate: (inputs: GenerateRequest["inputs"]) => void;
  isLoading: boolean;
};

/**
 * 左側の入力パネルコンポーネント
 */
export default function LeftPanel({ onGenerate, isLoading }: LeftPanelProps) {
  const [target, setTarget] = useState("");
  const [symptom, setSymptom] = useState("");
  const [situation, setSituation] = useState("");
  const [level, setLevel] = useState(3);
  const [nuance, setNuance] = useState("ポエム風");

  const handleSubmit = () => {
    // バリデーション
    if (!symptom.trim()) {
      alert("症状を入力してください");
      return;
    }

    // API送信用のデータを作成
    const inputs: GenerateRequest["inputs"] = {
      symptoms: [symptom.trim()],
      level: level,
      target: target.trim() || null,
      situation: situation.trim() || null,
      nuance: nuance || null,
    };

    onGenerate(inputs);
  };

  return (
    <div className="flex flex-col h-full bg-white m-1 p-6 rounded-xl border border-blue-100">
      <div className="flex-1 space-y-6 overflow-y-auto">
        {/* 相手入力 */}
        <div className="space-y-2">
          <TextBoxWithLabel label="相手" placeholder="例：上司、先生" value={target} disabled={isLoading}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>

        {/* 症状入力 */}
        <div className="space-y-2">
          <TextBoxWithLabel label="症状" placeholder="例：鼻水が止まらない" value={symptom} disabled={isLoading}
            onChange={(e) => setSymptom(e.target.value)}
          />
        </div>

        {/* 状況入力 */}
        <div className="space-y-2">
          <TextBoxWithLabel label="状況" placeholder="例：大事な会議前" value={situation} disabled={isLoading}
            onChange={(e) => setSituation(e.target.value)}
          />
        </div>

        {/* 花粉症レベル */}
        <div className="space-y-4 pt-2">
          <NumberSliderWithLabel label="花粉症レベル" min={1} max={5} step={1} value={level} disabled={isLoading}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          />
        </div>

        {/* ニュアンス/文体 */}
        <div className="space-y-2">
          <SelectBoxWithLabel label="ニュアンス/文体" value={nuance} disabled={isLoading}
            onChange={(e) => setNuance(e.target.value)}
          >
            <option value="ポエム風">ポエム風</option>
            <option value="ビジネスライク">ビジネスライク</option>
            <option value="深刻">深刻</option>
            <option value="軽いタッチ">軽いタッチ</option>
            <option value="ユーモア">ユーモア</option>
          </SelectBoxWithLabel>
        </div>
      </div>

      {/* 生成ボタン */}
      <div className="pt-6 mt-4 border-t border-gray-100">
        <Button onClick={handleSubmit} color="blue" disabled={isLoading}>
          <span>{isLoading ? "生成中..." : "言い訳を生成する"}</span>
        </Button>
      </div>
    </div>
  );
}
