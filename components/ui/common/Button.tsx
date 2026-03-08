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
    white: "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300",
    black: "bg-black text-white hover:bg-gray-800",
    green: "bg-green-500 text-white hover:bg-green-600",
    blue: "bg-blue-500 text-white hover:bg-blue-600",
    red: "bg-red-500 text-white hover:bg-red-600",
    yellow: "bg-yellow-400 text-black hover:bg-yellow-500",
};

export default function Button({ id, onClick, color = "none", disabled = false, className = DEFAULT_CLASS_NAME, children }: Props) {
    return (
        <button type="button" id={id} onClick={onClick} disabled={disabled} className={`${className} ${colorClass[color]}`}>
            {children}
        </button>
    );
}
