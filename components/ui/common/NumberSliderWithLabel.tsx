import { ChangeEvent } from "react";
import NumberSlider from "./NumberSlider";
import Label from "./Label";

/**
 * ラベル付き整数スライダーの部品コンポーネント
 */
type NumberSliderWithLabelProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: number,
    min: number,
    max: number,
    step: number,
    label: string,
    disabled?: boolean,
};

export default function NumberSliderWithLabel({ onChange, min, max, step, value, label, disabled = false }: NumberSliderWithLabelProps) {
    return (
        <>
            <div className="flex justify-between items-center">
                <Label>{label}</Label>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                    {value}
                </div>
            </div>
            <NumberSlider onChange={onChange} min={min} max={max} step={step} value={value} disabled={disabled} />
        </>
    );
}
