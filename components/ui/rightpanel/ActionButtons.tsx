"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TextBoxWithLabel from "../common/TextBoxWithLabel";
import ShareButton from "./button/ShareButton";
import { GenerateResponse } from "@/types/api";

/**
 * もっと盛る、SNS共有ボタン
 */
export default function ActionButtons({onRetry, result}: {onRetry: (retryInstruction: string) => void, result: GenerateResponse}) {
    const [showRetryInput, setShowRetryInput] = useState(false);
    const [retryInstruction, setRetryInstruction] = useState("");

    const handleRetry = () => {
        if (!showRetryInput) {
            setShowRetryInput(true);
            return;
        }
    };

    const handleRetrySubmit = () => {
        const trimmedInstruction = retryInstruction.trim();

        if (!trimmedInstruction) {
            alert("追加の指示を入力してください");
            return;
        }

        onRetry(trimmedInstruction);

        setShowRetryInput(false);
        setRetryInstruction("");
    };

    return (
        <div className="pt-4 mt-4 border-t border-gray-100">
            <div className={"flex flex-col min-[380px]:flex-row gap-2"}>
                <Button color="green" onClick={handleRetry}>
                    <FontAwesomeIcon icon={faTurnUp} />
                    もっと盛る
                </Button>
                <ShareButton result={result} />
            </div>
            
            {/* 入力欄（もっと盛るボタンを押したら表示） */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showRetryInput ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="space-y-2 border-t border-gray-100 py-4 mt-4">
                    <TextBoxWithLabel label="追加の指示" placeholder="例: もっと怒った感じで" value={retryInstruction}
                        onChange={(e) => setRetryInstruction(e.target.value)}
                    />
                    <div className="flex flex-col min-[350px]:flex-row gap-2 border-t border-gray-100 py-4 mt-4">
                        <Button color="blue" onClick={handleRetrySubmit}>再生成</Button>
                        <Button color="red" onClick={() => setShowRetryInput(false)}>キャンセル</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
