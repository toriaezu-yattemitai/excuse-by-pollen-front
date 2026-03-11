import { ReactNode } from "react";

/**
 * バッジの部品コンポーネント
 */
type BadgeProps = {
    color?: "black" | "green" | "blue" | "red" | "yellow" | "white" | string,
    children: ReactNode,
};

const colorClass: Record<string, string> = {
    white: "bg-gray-100 text-gray-800 border-2 border-gray-800 font-bold",
    black: "bg-gray-800 text-white border-2 border-gray-900 font-bold",
    green: "bg-green-100 text-green-800 border-2 border-green-700 font-bold",
    blue: "bg-cyan-100 text-cyan-800 border-2 border-cyan-700 font-bold",
    red: "bg-red-100 text-red-800 border-2 border-red-700 font-bold",
    yellow: "bg-yellow-100 text-yellow-800 border-2 border-yellow-600 font-bold",
};

/**
 * バッジ
 * @param color 色、randomの場合はランダムとなる
 * @param children 表示名
 * @returns バッジ
 */
export default function Badge({ children, color = "random" }: BadgeProps) {
    if (color === "random") {
        const colors = ["green", "blue", "red", "yellow", "white"];
        color = colors[Math.floor(Math.random() * colors.length)];
    }

    return (
        <div className={`px-2 py-0.5 transition-all duration-300 ease-in-out rounded-4xl hover:scale-105 ${colorClass[color]}`}>
            {children}
        </div>
    );
}
