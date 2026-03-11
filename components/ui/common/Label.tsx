import { ReactNode } from "react";

/**
 * ラベルの部品コンポーネント
 */
type Props = {
    forId?: string,
    children: ReactNode,
};

export default function Label({ forId, children }: Props) {
    return (
        <label htmlFor={forId} className={`block text-sm font-black text-gray-800 ${forId ? "cursor-pointer" : ""}`}>{children}</label>
    );
}
