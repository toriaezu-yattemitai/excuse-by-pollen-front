"use client";

import BottomPanel from "@/components/ui/BottomPanel";
import LeftPanel from "@/components/ui/LeftPanel";
import RightPanel from "@/components/ui/RightPanel";
import { useGenerate } from "@/hooks/useGenerate";
import { useState } from "react";

export default function Home() {
  const { result, isLoading, error, handleGenerate, handleRetry, handleResend } = useGenerate();

  const [showBottomPanel, setShowBottomPanel] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* メインコンテンツエリア
        - パソコン: 左右2カラムレイアウト
        - ケータイ: 上下レイアウト
        */}
      <main className="flex-1 container mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* 左パネル */}
          <div className="h-full">
            <LeftPanel onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* 右パネル */}
          <div className="h-full">
            <RightPanel onRetry={handleRetry} onResend={handleResend} isLoading={isLoading} result={result}  error={error} />
          </div>
        </div>

        {/* 下部パネル */}
        {showBottomPanel && <BottomPanel />}
      </main>
    </div>
  );
}
