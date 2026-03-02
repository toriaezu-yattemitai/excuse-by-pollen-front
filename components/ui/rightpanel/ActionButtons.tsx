"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

/**
 * もっと盛る、SNS共有ボタン
 */
export default function ActionButtons() {
    const shareText = "花粉言い訳ジェネレーターで生成した結果をシェア！ #花粉エクスキューズジェネレーター";
    const shareUrl = "https://excuse-by-pollen.vercel.app/";

    const handleShare = () => {
        const url = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="pt-4 mt-4 border-t border-gray-100">
            <div className={"flex flex-row gap-2"}>
                <Button color="green" onClick={() => {
                    console.log("もっと盛る");
                }}>
                    <FontAwesomeIcon icon={faArrowUp} />
                    もっと盛る
                </Button>
                <Button onClick={handleShare}><FontAwesomeIcon icon={faXTwitter} />Xでシェア</Button>
            </div>
        </div>
    );
}
