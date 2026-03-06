import { CSSProperties } from "react";
import styles from "./ResultCard.module.css";
import { GenerateResponse } from "@/types/api";
import getScoreEmoji from "@/app/utils/ScoreEmoji";

/**
 * 生成結果の表示カード
 */
export default function ResultCard({ result }: {
  result: GenerateResponse | {
    excuse: string,
    score: number,
  }
}) {
  const progress = (result.score / 100) * 360;

  return (
    <div className="flex flex-col bg-white p-4 m-2 lg:p-5 z-10 border border-gray-200 rounded-2xl">
      <span className="flex-1 text-gray-700 text-lg lg:text-xl">{result.excuse}</span>
      <hr className="my-3" />
      <div className="flex items-center justify-between">
        <span className="text-2xl">{getScoreEmoji(result.score)}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-500 tracking-wide">説得力スコア</span>
          <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100">
            <div
              id="score-circle"
              className={`${styles.circularProgress} absolute inset-0 rounded-full circular-progress`}
              style={{ "--progress": `${progress}deg` } as CSSProperties}
            ></div>
            <div className="absolute inset-1.5 lg:inset-2 bg-white rounded-full flex items-center justify-center">
              <span id="score-value" className="text-lg lg:text-xl font-black text-gray-600">{result.score}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
