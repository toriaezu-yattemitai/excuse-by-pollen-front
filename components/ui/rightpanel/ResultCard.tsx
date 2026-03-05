import { CSSProperties } from "react";
import styles from "./ResultCard.module.css";

// スコアに基づいて絵文字をつくる (それぞれの絵文字はとりあえず仮)
function getScoreEmoji(score: number): string {
  if (score >= 90) return "🌟";
  if (score >= 75) return "✨";
  if (score >= 60) return "👍";
  if (score >= 40) return "😅";
  return "💧";
}

/**
 * 生成結果の表示カード
 */
export default function ResultCard({ text, score }: {
  text: string;
  score: number; // 0 〜 100 のスコア
}) {
  const progress = (score / 100) * 360;

  return (
    <>
      <div className="flex flex-col bg-white p-4 m-2 lg:p-5 z-10 border border-gray-200 rounded-2xl">
        <span className="flex-1 text-gray-700 text-lg lg:text-xl">{text}</span>
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <span className="text-2xl">{getScoreEmoji(score)}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 tracking-wide">説得力スコア</span>
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100">
              <div
                id="score-circle"
                className={`${styles.circularProgress} absolute inset-0 rounded-full circular-progress`}
                style={{ "--progress": `${progress}deg` } as CSSProperties}
              ></div>
              <div className="absolute inset-1.5 lg:inset-2 bg-white rounded-full flex items-center justify-center">
                <span id="score-value" className="text-lg lg:text-xl font-black text-gray-600">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
