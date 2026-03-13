import ComboBoxWithLabel from "../common/ComboBoxWithLabel";
import NumberSliderWithLabel from "../common/NumberSliderWithLabel";
import RequireMark from "../common/RequireMark";
import TextBoxWithLabel from "../common/TextBoxWithLabel";
import UseLocationCheckBox from "./UseLocationCheckBox";

type Props = {
    isLoading: boolean,
    symptom: string,
    setSymptom: (symptom: string) => void,
    target: string,
    setTarget: (target: string) => void,
    situation: string,
    setSituation: (situation: string) => void,
    level: number,
    setLevel: (level: number) => void,
    nuance: string,
    setNuance: (nuance: string) => void,
    useLocation: boolean,
    setUseLocation: (useLocation: boolean) => void,
};

/**
 * 左側パネルの入力エリア
 */
export default function InputSection({ isLoading, symptom, setSymptom, target, setTarget, situation, setSituation, level
    , setLevel, nuance, setNuance, useLocation, setUseLocation }: Props) {
    
    return (
        <>
            {/* 症状入力 */}
            <div className="space-y-2">
                <TextBoxWithLabel id="symptom" label={<>症状 <RequireMark /></>} placeholder="例：鼻水が止まらない" value={symptom}
                    disabled={isLoading} onChange={(e) => setSymptom(e.target.value)}
                />
            </div>

            {/* 相手入力 */}
            <div className="space-y-2">
                <ComboBoxWithLabel id="target" label="相手" placeholder="例：上司、先生" value={target} disabled={isLoading}
                    onChange={(e) => setTarget(e.target.value)}>
                    <option value="上司">上司</option>
                    <option value="先生">先生</option>
                    <option value="同僚">同僚</option>
                    <option value="友達">友達</option>
                    <option value="親">親</option>
                    <option value="恋人">恋人</option>
                    <option value="取引先">取引先</option>
                    <option value="クライアント">クライアント</option>
                </ComboBoxWithLabel>
            </div>

            {/* 状況入力 */}
            <div className="space-y-2">
                <TextBoxWithLabel id="situation" label="状況" placeholder="例：大事な会議前" value={situation} disabled={isLoading}
                    onChange={(e) => setSituation(e.target.value)}
                />
            </div>

            {/* 花粉症レベル */}
            <div className="space-y-2">
                <NumberSliderWithLabel id="level" label="花粉症レベル" min={1} max={5} step={1} value={level} disabled={isLoading}
                    onChange={(e) => setLevel(parseInt(e.target.value))}
                />
            </div>

            {/* ニュアンス/文体 */}
            <div className="space-y-2">
                <ComboBoxWithLabel id="nuance" label="ニュアンス/文体" placeholder="例：ポエム風、ビジネスライク" value={nuance} 
                    disabled={isLoading} onChange={(e) => setNuance(e.target.value)}
                >
                    <option value="ポエム風">ポエム風</option>
                    <option value="ビジネスライク">ビジネスライク</option>
                    <option value="深刻">深刻</option>
                    <option value="軽いタッチ">軽いタッチ</option>
                    <option value="ユーモア">ユーモア</option>
                    <option value="ファンタジー風">ファンタジー風</option>
                </ComboBoxWithLabel>
            </div>

            {/* 位置情報取得の同意チェックボックス */}
            <div className="space-y-1">
                <UseLocationCheckBox useLocation={useLocation} setUseLocation={setUseLocation} isLoading={isLoading}/>
            </div>
        </>
    );
}
