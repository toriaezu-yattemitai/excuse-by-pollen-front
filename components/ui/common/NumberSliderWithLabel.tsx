import { ChangeEvent, ReactNode, useId } from "react";
import NumberSlider from "./NumberSlider";
import Label from "./Label";

/**
 * ラベル付き整数スライダーの部品コンポーネント
 */
type NumberSliderWithLabelProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    id?: string,
    value: number,
    min: number,
    max: number,
    step: number,
    label: string | ReactNode,
    disabled?: boolean,
};

export default function NumberSliderWithLabel({ onChange, id, min, max, step, value, label, disabled = false }: NumberSliderWithLabelProps) {
    const generatedId = useId();
    id = id || generatedId; // idが指定されていない場合はuseId()から利用する

    return (
        <>
            <div className="flex justify-between items-center">
                <Label forId={id}>{label}</Label>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-black text-sm">
                    {value}
                </div>
            </div>
            <NumberSlider id={id} onChange={onChange} min={min} max={max} step={step} value={value} disabled={disabled} />
        </>
    );
}
