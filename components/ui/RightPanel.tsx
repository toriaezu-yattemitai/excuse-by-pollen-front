"use client";

import Button from "./common/Button";
import ActionButtons from "./rightpanel/ActionButtons";
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
 * 右側の生成後のパネルコンポーネント
 */
export default function RightPanel({ onRetry, onResend, result, isLoading, error }: RightPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white m-1 p-6 rounded-xl border border-blue-100">
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 font-medium">言い訳を生成中...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2 text-red-600">
            <p className="font-bold">エラーが発生しました</p>
            <p className="text-sm">{error}</p>
            <Button color="blue" onClick={onResend}>再送する</Button>
          </div>
        </div>
      )}

      {!isLoading && !error && !result && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p>ここには生成後、結果が表示されます</p>
          </div>
        </div>
      )}

      {!isLoading && !error && result && (
        <>
          <ResultCard text={result.excuse} score={result.score} />
          <ActionButtons onRetry={onRetry} />
        </>
      )}
    </div>
  );
}
