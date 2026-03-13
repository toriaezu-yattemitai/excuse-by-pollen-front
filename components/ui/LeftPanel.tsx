"use client";

import { useState } from "react";
import type { GenerateRequest } from "@/types/api";
import GenerateButton from "./leftpanel/GenerateButton";
import InputSection from "./leftpanel/InputSection";

type Props = {
    onGenerate: (inputs: GenerateRequest["inputs"], options?: Partial<GenerateRequest["options"]>) => void,
    isLoading: boolean,
};

/**
 * 左側の入力パネルコンポーネント
 */
export default function LeftPanel({ onGenerate, isLoading }: Props) {
    const [target, setTarget] = useState("");
    const [symptom, setSymptom] = useState("");
    const [situation, setSituation] = useState("");
    const [level, setLevel] = useState(3);
    const [nuance, setNuance] = useState("");
    const [useLocation, setUseLocation] = useState(false);

    return (
        <div className="flex flex-col h-full bg-white m-2 p-6 rounded-xl border-[3px] border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex-1 space-y-5 overflow-y-auto">
                <InputSection isLoading={isLoading} symptom={symptom} setSymptom={setSymptom} target={target} setTarget={setTarget}
                    situation={situation} setSituation={setSituation} level={level} setLevel={setLevel} nuance={nuance} setNuance={setNuance}
                    useLocation={useLocation} setUseLocation={setUseLocation}
                />
            </div>

            {/* 生成ボタン */}
            <div className="pt-2">
                <GenerateButton onGenerate={onGenerate} isLoading={isLoading} symptom={symptom} target={target} situation={situation} level={level}
                    nuance={nuance} useLocation={useLocation}
                />
            </div>
        </div>
    );
}
