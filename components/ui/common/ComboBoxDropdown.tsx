import { RefObject } from "react";
import { createPortal } from "react-dom";
import type { ComboBoxOption } from "@/hooks/ui/useComboBoxOptions";

type Props = {
    id: string,
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

export default function ComboBoxDropdown({ id, isMounted, isOpen, disabled, dropdownRef, position, options, value, onSelect, highlightedIndex }: Props) {
    if (!isMounted || !isOpen || disabled) return null;
    if (options.length <= 0) return null; // 候補がなければそもそもnullにする

    return createPortal(
        <div id={id} role="listbox" ref={dropdownRef} className="z-50 bg-white border-2 border-gray-700 border-t-0 rounded-b-xl shadow-lg max-h-56 overflow-y-auto"
            style={{ position: "fixed", top: `${position.top}px`, left: `${position.left}px`, width: `${position.width}px` }}
            onMouseDown={(e) => e.preventDefault()}>
            {(options.map((option, index) => (
                <div
                    role="option"
                    aria-selected={option.value === value}
                    key={option.value}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onSelect(option.value)}
                    className={`w-full text-left px-4 py-2 transition-colors font-medium cursor-pointer ${
                        option.value === value ? "bg-amber-50 text-amber-700 font-black" : index === highlightedIndex ? "bg-gray-100 text-gray-800 font-medium" : "text-gray-700 hover:bg-gray-50 font-medium"}`}
                >
                    {option.label}
                </div>
            )))}
        </div>,
        document.body,
    );
}
