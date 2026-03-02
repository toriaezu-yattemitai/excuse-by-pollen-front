"use client";

import { useState } from "react";
import ActionButtons from "./rightpanel/ActionButtons";
import ResultCard from "./rightpanel/ResultCard";

/**
 * 右側の生成後のパネルコンポーネント
 */
export default function RightPanel() {
  const [excuse, setExcuse] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  return (
    <>
      <div className="flex flex-col h-full bg-white m-1 p-6 rounded-xl border border-blue-100">
        <ResultCard text={excuse} score={score} />
        <ActionButtons />
      </div>
    </>
  );
}
