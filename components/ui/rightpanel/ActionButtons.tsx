import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TextBoxWithLabel from "../common/TextBoxWithLabel";

/**
 * もっと盛る、SNS共有ボタン
 */
export default function ActionButtons({onRetry}: {onRetry: (retryInstruction: string) => void}) {
    const [showRetryInput, setShowRetryInput] = useState(false);
    const [retryInstruction, setRetryInstruction] = useState("");


    const shareText = "花粉言い訳ジェネレーターで生成した結果をシェア！ #花粉エクスキューズジェネレーター";
    const shareUrl = "https://excuse-by-pollen.vercel.app/";

    const handleRetry = () => {
        if (!showRetryInput) {
            setShowRetryInput(true);
            return;
        }
    };

    const handleRetrySubmit = () => {
        setRetryInstruction(retryInstruction.trim());

        if (!retryInstruction) {
            alert("追加の指示を入力してください");
            return;
        }

        onRetry(retryInstruction);

        setShowRetryInput(false);
        setRetryInstruction("");
    };


    const handleShare = () => {
        const url = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="pt-4 mt-4 border-t border-gray-100">
            <div className={"flex flex-row gap-2"}>
                <Button color="green" onClick={handleRetry}>
                    <FontAwesomeIcon icon={faTurnUp} />
                    もっと盛る
                </Button>
                <Button onClick={handleShare}>
                    <FontAwesomeIcon icon={faXTwitter} />Xでシェア
                </Button>
            </div>
            
            {/* 入力欄（もっと盛るボタンを押したら表示） */}
            {showRetryInput && (
                <div className="space-y-2 border-t border-gray-100 py-4 mt-4">
                    <TextBoxWithLabel label="追加の指示" placeholder="例: もっと怒った感じで" value={retryInstruction}
                        onChange={(e) => setRetryInstruction(e.target.value)}
                    />
                    <div className="flex gap-2 border-t border-gray-100 py-4 mt-4">
                        <Button color="blue" onClick={handleRetrySubmit}>再生成</Button>
                        <Button color="red" onClick={() => setShowRetryInput(false)}>キャンセル</Button>
                    </div>
                </div>
            )}    
        </div>
    );
}
