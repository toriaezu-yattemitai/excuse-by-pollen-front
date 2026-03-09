import { RefObject } from "react";
import { createPortal } from "react-dom";
import type { ComboBoxOption } from "@/hooks/ui/useComboBoxOptions";

type Props = {
    isMounted: boolean;
    isOpen: boolean;
    disabled: boolean;
    dropdownRef: RefObject<HTMLDivElement | null>;
    position: { top: number; left: number; width: number };
    options: ComboBoxOption[];
    value: string;
    onSelect: (nextValue: string) => void;
};

export default function ComboBoxDropdown({ isMounted, isOpen, disabled, dropdownRef, position, options, value, onSelect }: Props) {
    if (!isMounted || !isOpen || disabled) return null;

    return createPortal(
        <div ref={dropdownRef} className="z-50 bg-gray-50 border border-gray-200 border-t-0 rounded-b-xl shadow-lg max-h-56 overflow-y-auto"
            style={{ position: "fixed", top: `${position.top}px`, left: `${position.left}px`, width: `${position.width}px` }}
            onMouseDown={(e) => e.preventDefault()}>
            {options.length > 0 ? (options.map((option) => (
                <button type="button" key={option.value} onMouseDown={(e) => e.preventDefault()} onClick={() => onSelect(option.value)}
                    className={`w-full text-left px-4 py-2 transition-colors ${
                        option.value === value ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}>
                    {option.label}
                </button>
            ))) : (
                <div className="px-4 py-2 text-sm text-gray-500">一致する候補がありません</div>
            )}
        </div>,
        document.body,
    );
}