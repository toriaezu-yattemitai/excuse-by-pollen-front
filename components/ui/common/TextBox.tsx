import { ChangeEvent } from "react";

/**
 * テキストボックスの部品コンポーネント
 */
type Props = {
    id?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string | undefined,
    value: string | undefined,
    disabled?: boolean,
};

export default function TextBox({ id, onChange, placeholder = "", value = "", disabled = false }: Props) {
    return (
        <input
            type="text"
            id={id}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
}
