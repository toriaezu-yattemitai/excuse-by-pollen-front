import { ReactNode } from "react";

/**
 * ボタンの部品コンポーネント
 */
type ButtonProps = {
    id?: string,
    onClick?: () => void,
    color?: "black" | "green" | "blue" | "red" | "yellow",
    disabled?: boolean,
    children: ReactNode,
};

const colorClass: Record<string, string> = {
    black: "bg-black text-white hover:bg-gray-800",
    green: "bg-green-500 text-white hover:bg-green-600",
    blue: "bg-blue-500 text-white hover:bg-blue-600",
    red: "bg-red-500 text-white hover:bg-red-600",
    yellow: "bg-yellow-400 text-black hover:bg-yellow-500",
};

export default function Button({ id, onClick, color = "black", disabled = false, children }: ButtonProps) {
    return (
        <button type="button" id={id} onClick={onClick} disabled={disabled} className={`w-full px-4 py-3 focus:outline-none cursor-pointer transition-all duration-300 ease-in-out rounded-xl flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed ${colorClass[color]}`}>
            {children}
        </button>
    );
}
