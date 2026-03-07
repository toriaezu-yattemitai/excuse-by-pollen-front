import { ReactNode } from "react";

/**
 * バッジの部品コンポーネント
 */
type BadgeProps = {
    color?: "black" | "green" | "blue" | "red" | "yellow" | "white" | string,
    children: ReactNode,
};

const colorClass: Record<string, string> = {
    white: "bg-gray-100 text-black hover:bg-gray-300 border border-gray-400",
    black: "bg-gray-500 text-white hover:bg-gray-400 border border-gray-700",
    green: "bg-green-100 text-black hover:bg-green-200 border border-green-300",
    blue: "bg-blue-100 text-black hover:bg-blue-200 border border-blue-300",
    red: "bg-red-100 text-black hover:bg-red-200 border border-red-300",
    yellow: "bg-yellow-100 text-black hover:bg-yellow-200 border border-yellow-300",
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
