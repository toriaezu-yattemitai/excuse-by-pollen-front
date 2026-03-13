import { GenerateRequest } from "@/types/api";
import getCurrentLocation from "@/app/utils/LocationUtil";
import Button from "../common/Button";

type Props = {
    onGenerate: (inputs: GenerateRequest["inputs"], options?: Partial<GenerateRequest["options"]>) => void,
    isLoading: boolean,
    symptom: string,
    target: string,
    situation: string,
    level: number,
    nuance: string,
    useLocation: boolean,
};

/**
 * 生成ボタンコンポーネント
 */
export default function GenerateButton({onGenerate, isLoading, symptom, target, situation, level, nuance, useLocation}: Props) {
    const handleSubmit = async () => {
        // バリデーション
        if (!symptom.trim()) {
            alert("症状を入力してください");
            return;
        }

        // 位置情報の取得（チェックがONの場合のみ）
        let locationData: { latitude: number; longitude: number } | null = null;
        if (useLocation)
            locationData = await getCurrentLocation();

        // API送信用のデータを作成
        const inputs: GenerateRequest["inputs"] = {
            symptoms: [symptom.trim()],
            level: level,
            target: target.trim() || null,
            situation: situation.trim() || null,
            nuance: nuance.trim() || null,
        };

        // options の組み立て（location があれば含める）
        const options: Partial<GenerateRequest["options"]> = {};
        if (locationData)
            options.location = locationData;

        onGenerate(inputs, options);
    };

    return (
        <Button id="generate" onClick={handleSubmit} color="pink" disabled={isLoading}>
            <span>{isLoading ? "生成中..." : "言い訳を生成する"}</span>
        </Button>
    );
}
