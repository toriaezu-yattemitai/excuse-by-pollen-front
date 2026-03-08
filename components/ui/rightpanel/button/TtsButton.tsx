"use client";

import { GenerateResponse } from "@/types/api";
import Button from "../../common/Button";
import { useState } from "react";
import { faPause, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  result: GenerateResponse | {
    excuse: string,
    score: number,
  }
};

/**
 * 読み上げボタン
 */
export default function TtsButton({result}: Props) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleClick = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(result.excuse);
        utterance.lang = "ja-JP";
        
        utterance.pitch = 0.8;  // 音程
        utterance.rate = 0.85;  // 速度
        utterance.volume = 1.0; // 音量

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = (e) => {
            setIsSpeaking(false);
            if (e.error === "interrupted") return;

            console.error("音声合成エラー: ", e);
            alert("読み上げに失敗しました。ブラウザが音声合成に対応していない可能性があります。")
        };

        window.speechSynthesis.speak(utterance);
    };

    return (
        <Button color="none" onClick={handleClick} className="focus:outline-none cursor-pointer transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
            <FontAwesomeIcon icon={isSpeaking ? faPause : faVolumeHigh} />
        </Button>
    );
}
