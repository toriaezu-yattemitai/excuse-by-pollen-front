"use client";

import ActionButtons from "./rightpanel/ActionButtons";
import ErrorSection from "./rightpanel/ErrorSection";
import InitialSection from "./rightpanel/InitialSection";
import LoadingSection from "./rightpanel/LoadingSection";
import ResultCard from "./rightpanel/ResultCard";
import type { GenerateResponse } from "@/types/api";

type RightPanelProps = {
  onRetry: (retryInstruction: string) => void,
  onResend: () => void,
  result: GenerateResponse | null,
  isLoading: boolean,
  error: string | null,
};

/**
 * 右側のパネルコンポーネント
 */
export default function RightPanel({ onRetry, onResend, result, isLoading, error }: RightPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white m-1 p-6 rounded-xl border border-blue-100">
      { /* 生成中 */ }
      {isLoading && <LoadingSection />}

      { /* エラー */}
      {error && <ErrorSection error={error} onResend={onResend} /> }

      { /* 初期状態 */ }
      {!isLoading && !error && !result && <InitialSection /> }

      { /* 生成結果 */ }
      {!isLoading && !error && result && (
        <>
          <ResultCard result={result} />
          <ActionButtons onRetry={onRetry} />
        </>
      )}
    </div>
  );
}
