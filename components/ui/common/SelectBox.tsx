import { ChangeEvent, ReactNode } from "react";

/**
 * 選択ボックスの部品コンポーネント
 */
type Props = {
    id?: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    value: string,
    children: ReactNode,
    disabled?: boolean,
};

export default function SelectBox({ id, onChange, value, children, disabled = false }: Props) {
    return (
        <div className="relative">
            <select id={id} value={value} onChange={onChange} disabled={disabled}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 pr-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                {children}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}
