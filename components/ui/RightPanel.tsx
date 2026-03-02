"use client";

import ActionButtons from "./rightpanel/ActionButtons";
import ResultCard from "./rightpanel/ResultCard";

/**
 * 右側の生成後のパネルコンポーネント
 */
export default function RightPanel() {
  return (
    <>
      <div>
        <ResultCard text="国家の損失を防ぐため、本日は休養を要します..." score={75} />
        <ActionButtons />
      </div>
    </>
  );
}
