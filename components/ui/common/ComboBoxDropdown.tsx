import { RefObject } from "react";
import { createPortal } from "react-dom";
import type { ComboBoxOption } from "@/hooks/ui/useComboBoxOptions";

type Props = {
    isMounted: boolean,
    isOpen: boolean,
    disabled: boolean,
    dropdownRef: RefObject<HTMLDivElement | null>,
    position: { top: number; left: number; width: number },
    options: ComboBoxOption[],
    value: string,
    onSelect: (nextValue: string) => void,
    highlightedIndex: number
};

export default function ComboBoxDropdown({ isMounted, isOpen, disabled, dropdownRef, position, options, value, onSelect, highlightedIndex }: Props) {
    if (!isMounted || !isOpen || disabled || options.length === 0) return null;

    return createPortal(
        <div ref={dropdownRef} className="z-50 bg-white border-2 border-gray-700 border-t-0 rounded-b-xl shadow-lg max-h-56 overflow-y-auto"
            style={{ position: "fixed", top: `${position.top}px`, left: `${position.left}px`, width: `${position.width}px` }}
            onMouseDown={(e) => e.preventDefault()}>
            {options.length > 0 && (options.map((option, index) => (
                <button type="button" key={option.value} onMouseDown={(e) => e.preventDefault()} onClick={() => onSelect(option.value)}
                    className={`w-full text-left px-4 py-2 transition-colors font-medium ${
                        option.value === value ? "bg-cyan-50 text-cyan-700 font-black" : index === highlightedIndex ? "bg-gray-100 text-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>
                    {option.label}
                </button>
            )))}
        </div>,
        document.body,
    );
}
