import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Button from "../../common/Button";
import { GenerateResponse } from "@/types/api";

/**
 * SNS共有ボタン
 */
export default function ShareButton({result}: {result: GenerateResponse}) {
    const shareText = "花粉言い訳ジェネレーターで生成した結果をシェア！ #花粉エクスキューズジェネレーター";
    const shareUrl = "https://excuse-by-pollen.vercel.app/share/?text=" + encodeURIComponent(result.excuse) + "&score=" + encodeURIComponent(result.score);

    const handleShare = () => {
        const url = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank");
    };

    return (
        <Button color="black" onClick={handleShare}>
            <FontAwesomeIcon icon={faXTwitter} />Xでシェア
        </Button>
    );
}
