import { ReactNode } from "react";

/**
 * ボタンの部品コンポーネント
 */
type Props = {
    id?: string,
    onClick: () => void,
    color?: "none" | "white" | "black" | "pink" | "green" | "blue" | "red" | "yellow",
    disabled?: boolean,
    className?: string,
    children: ReactNode,
};

const DEFAULT_CLASS_NAME = "w-full px-4 py-3 focus:outline-none cursor-pointer transition-all duration-200 ease-in-out rounded-xl flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed";

const STYLED_CLASS_NAME = `${DEFAULT_CLASS_NAME} border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-[3px]`;

const colorClass: Record<string, string> = {
    none: DEFAULT_CLASS_NAME,
    white: `${STYLED_CLASS_NAME} bg-white text-gray-800 hover:bg-gray-100 font-bold`,
    black: `${STYLED_CLASS_NAME} bg-gray-600 text-white hover:bg-gray-900 font-bold`,
    pink: `${STYLED_CLASS_NAME} bg-pink-500 text-white hover:bg-pink-600 font-bold`,
    blue: `${STYLED_CLASS_NAME} bg-cyan-500 text-white hover:bg-cyan-600 font-bold`,
    green: `${STYLED_CLASS_NAME} bg-green-500 text-white hover:bg-cyan-600 font-bold`,
    red: `${STYLED_CLASS_NAME} bg-red-500 text-white hover:bg-red-600 font-bold`,
    yellow: `${STYLED_CLASS_NAME} bg-yellow-400 text-gray-800 hover:bg-yellow-500 font-bold`,
};

export default function Button({ id, onClick, color = "none", disabled = false, className, children }: Props) {
    const cls = className ?? colorClass[color] ?? DEFAULT_CLASS_NAME;
    return (
        <button type="button" id={id} onClick={onClick} disabled={disabled} className={cls}>
            {children}
        </button>
    );
}
