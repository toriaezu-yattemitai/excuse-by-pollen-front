import { ReactNode } from "react";

/**
 * ラベルの部品コンポーネント
 */
export default function Label({ children }: {children: ReactNode}) {
    return (
        <label className="block text-sm font-bold text-gray-700">{children}</label>
    );
}
