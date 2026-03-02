"use client";

import { useState } from "react";
import Header from "@/components/ui/Header";
import LeftPanel from "@/components/ui/LeftPanel";
import RightPanel from "@/components/ui/RightPanel";
import type { GenerateRequest, GenerateResponse } from "@/types/api";

export default function Home() {
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (inputs: GenerateRequest["inputs"]) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload: GenerateRequest = {
        inputs,
        options: {
          max_chars: 220,
        },
      };

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "生成に失敗しました");
      }

      const data: GenerateResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      console.error("Generate error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="花粉エクスキューズジェネレーター" />

      {/* メインコンテンツエリア：左右2カラムレイアウト */}
      <main className="flex-1 container mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* 左パネル */}
          <div className="h-full">
            <LeftPanel onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* 右パネル */}
          <div className="h-full">
            <RightPanel result={result} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
    </div>
  );
}
