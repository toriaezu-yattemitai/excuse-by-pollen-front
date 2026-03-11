import { ChangeEvent } from "react";

/**
 * チェックボックスの部品コンポーネント
 */
type Props = {
    id?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    checked: boolean,
};

export default function CheckBox({ id, onChange, checked, disabled = false }: Props) {
    return (
        <input type="checkbox" id={id} checked={checked} onChange={onChange} disabled={disabled}
            className="h-5 w-5 rounded-md border-2 border-gray-700 accent-cyan-500 focus:ring-2 focus:ring-cyan-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        />
    );
}
