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
            className="w-full px-4 py-3 bg-white border-2 border-gray-700 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-gray-400 text-gray-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
}
