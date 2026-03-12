import Button from "../../common/Button";
import TextBoxWithLabel from "../../common/TextBoxWithLabel";
import { useState } from "react";

type Props = {
    setShowRetryInput: (showRetryInput: boolean) => void,
    onRetry: (retryInstruction: string) => void,
};

/**
 * もっと盛るボタン
 */
export default function RetryFormSection({setShowRetryInput, onRetry}: Props) {
    const [retryInstruction, setRetryInstruction] = useState("");

    const handleRetrySubmit = () => {
        const trimmedInstruction = retryInstruction.trim();

        if (!trimmedInstruction) {
            alert("追加の指示を入力してください");
            return;
        }

        // もっと盛るのAPIに送信する
        onRetry(trimmedInstruction);

        setShowRetryInput(false);
        setRetryInstruction("");
    };

    return (
        <div className="border-t-2 border-gray-200 pt-4 mt-4">
            <TextBoxWithLabel id="retry-instruction" label="追加の指示" placeholder="例: もっと怒った感じで" value={retryInstruction}
                onChange={(e) => setRetryInstruction(e.target.value)}
            />
            <div className="flex flex-col min-[350px]:flex-row gap-2 border-t-2 border-gray-200 pt-4 pb-1 mt-4">
                <Button id="retry-submit" color="orange" onClick={handleRetrySubmit}>再生成</Button>
                <Button id="retry-cancel" color="red" onClick={() => setShowRetryInput(false)}>キャンセル</Button>
            </div>
        </div>
    );
}
