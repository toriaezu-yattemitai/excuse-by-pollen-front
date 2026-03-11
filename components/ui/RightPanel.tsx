"use client";

import convertBadges from "@/app/utils/BadgeUtil";
import ActionButtons from "./rightpanel/ActionButtons";
import Badges from "./rightpanel/Badges";
import ErrorSection from "./rightpanel/section/ErrorSection";
import InitialSection from "./rightpanel/section/InitialSection";
import LoadingSection from "./rightpanel/section/LoadingSection";
import ResultCard from "./rightpanel/ResultCard";
import type { GenerateResponse } from "@/types/api";

type Props = {
  onRetry: (retryInstruction: string) => void,
  onResend: () => void,
  result: GenerateResponse | null,
  isLoading: boolean,
  error: string | null,
};

/**
 * 右側のパネルコンポーネント
 */
export default function RightPanel({ onRetry, onResend, result, isLoading, error }: Props) {
  return (
    <div className="flex flex-col h-full bg-white m-2 p-6 rounded-xl border-[3px] border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
          {result.options?.badges && <Badges badges={convertBadges(result.options.badges)} />}
          <ActionButtons onRetry={onRetry} result={result} />
        </>
      )}
    </div>
  );
}
