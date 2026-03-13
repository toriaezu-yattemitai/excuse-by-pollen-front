import { ChangeEvent } from "react";

/**
 * 整数スライダーの部品コンポーネント
 */
type NumberSliderProps = {
    id?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: number,
    min: number,
    max: number,
    step: number,
    disabled?: boolean,
};

export default function NumberSlider({ id, onChange, min, max, step, value, disabled = false }: NumberSliderProps) {
    const marks = Array.from(
        { length: Math.floor((max - min) / step) + 1 },
        (_, i) => min + i * step
    );

    const range = max - min;
    const rawProgress = range === 0 ? 0 : ((value - min) / range) * 100;
    const progress = Math.min(100, Math.max(0, rawProgress));
    const thumbOffsetRem = (progress / 100) * 1;

    return (
        <div className="p-2">
            <div className="group relative h-3 flex items-center rounded-lg">
                <div className="absolute inset-x-0 h-3 bg-gray-200 rounded-lg mx-1" />
                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 shadow-sm transition-[left,background-color,box-shadow] duration-200 ease-out ${
                        disabled
                            ? "bg-gray-100 border-gray-100"
                            : "bg-amber-500 border-amber-500 group-focus-within:ring-2 group-focus-within:ring-amber-300"
                    }`}
                    style={{ left: `calc(${progress}% - ${thumbOffsetRem}rem)` }}
                />
                <input
                    type="range"
                    id={id}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="absolute inset-0 w-full h-6 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2 mx-1 font-black">
                {marks.map((mark) => (
                    <span key={mark}>{mark}</span>
                ))}
            </div>
        </div>
    );
}
