import { ChangeEvent } from "react";

/**
 * テキストボックスの部品コンポーネント
 */
type TextBoxProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string | undefined,
    value: string | undefined,
};

export default function TextBox({ onChange, placeholder = "", value = "" }: TextBoxProps) {
    return (
        <input
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-700"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}
