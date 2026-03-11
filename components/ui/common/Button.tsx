import { ReactNode } from "react";

/**
 * ボタンの部品コンポーネント
 */
type Props = {
    id?: string,
    onClick: () => void,
    color?: "none" | "white" | "black" | "green" | "blue" | "red" | "yellow",
    disabled?: boolean,
    className?: string,
    children: ReactNode,
};

const DEFAULT_CLASS_NAME = "w-full px-4 py-3 focus:outline-none cursor-pointer transition-all duration-300 ease-in-out rounded-xl flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed";

const colorClass: Record<string, string> = {
    none: "",
    white: "bg-white text-gray-800 hover:bg-gray-100 border-2 border-gray-800 font-bold",
    black: "bg-gray-800 text-white hover:bg-gray-900 font-bold",
    green: "bg-pink-500 text-white hover:bg-pink-600 font-bold",
    blue: "bg-cyan-500 text-white hover:bg-cyan-600 font-bold",
    red: "bg-red-500 text-white hover:bg-red-600 font-bold",
    yellow: "bg-yellow-400 text-gray-800 hover:bg-yellow-500 font-bold",
};

export default function Button({ id, onClick, color = "none", disabled = false, className = DEFAULT_CLASS_NAME, children }: Props) {
    return (
        <button type="button" id={id} onClick={onClick} disabled={disabled} className={`${className} ${colorClass[color]}`}>
            {children}
        </button>
    );
}
