import { ChangeEvent } from "react";

/**
 * 整数スライダーの部品コンポーネント
 */
type NumberSliderProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: number,
    min: number,
    max: number,
    step: number,
};

export default function NumberSlider({ onChange, min, max, step, value }: NumberSliderProps) {
    const marks = Array.from(
        { length: Math.floor((max - min) / step) + 1 },
        (_, i) => min + i * step
    );

    return (
        <div className="px-1">
            <input type="range" min={min} max={max} step={step} value={value} onChange={onChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                {marks.map((mark) => (
                <span key={mark}>{mark}</span>
                ))}
            </div>
        </div>
    );
}
