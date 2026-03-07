import { ChangeEvent } from "react";

/**
 * チェックボックスの部品コンポーネント
 */
type Props = {
    id?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    checked?: boolean,
};

export default function CheckBox({ id, onChange, checked = false, disabled = false }: Props) {
    return (
        <input type="checkbox" id={id} checked={checked} onChange={onChange} disabled={disabled}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        />
    );
}
