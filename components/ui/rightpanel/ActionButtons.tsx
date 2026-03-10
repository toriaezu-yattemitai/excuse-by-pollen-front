"use client";

import { useState } from "react";
import ShareButton from "./button/ShareButton";
import { GenerateResponse } from "@/types/api";
import RetryButton from "./button/RetryButton";
import RetryFormSection from "./section/RetryFormSection";

type Props = {
    onRetry: (retryInstruction: string) => void,
    result: GenerateResponse,
};

/**
 * もっと盛る、SNS共有ボタン
 */
export default function ActionButtons({onRetry, result}: Props) {
    const [showRetryInput, setShowRetryInput] = useState(false);

    return (
        <div className="pt-4 mt-4 border-t border-gray-100">
            <div className={"flex flex-col min-[380px]:flex-row gap-2"}>
                <RetryButton id="retry-button" showRetryInput={showRetryInput} setShowRetryInput={setShowRetryInput}/>
                <ShareButton id="share-button" result={result} />
            </div>
            
            {/* もっと盛るときの入力欄（もっと盛るボタンを押したら表示） */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${ showRetryInput ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0' }`}>
                <RetryFormSection setShowRetryInput={setShowRetryInput} onRetry={onRetry} />
            </div>
        </div>
    );
}
