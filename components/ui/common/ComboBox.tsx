import { useDropdownPosition } from "@/hooks/ui/useDropdownPosition";
import { useComboBoxOptions } from "@/hooks/ui/useComboBoxOptions";
import { ChangeEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/ui/useOutsideClick";
import ComboBoxDropdown from "./ComboBoxDropdown";

/**
 * コンボボックスの部品コンポーネント (選択ボックス＋テキストボックス)
 */
type Props = {
	id?: string,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	placeholder?: string,
	value?: string,
	disabled?: boolean,
	children: ReactNode,
};

export default function ComboBox({ id, onChange, placeholder = "", value = "", disabled = false, children }: Props) {
	const generatedId = useId();
	const inputId = id || generatedId;
	const dropdownId = `${inputId}-listbox`;
	const [isOpen, setIsOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [highlightedIndex, setHighlightedIndex] = useState(-1); // キーボードでの選択用

    const { filteredOptions } = useComboBoxOptions(children, value);
    const { position } = useDropdownPosition(containerRef, isOpen);
    useOutsideClick([containerRef, dropdownRef], isOpen, () => setIsOpen(false));

	const emitChange = (nextValue: string) => {
		onChange({
			target: { value: nextValue },
			currentTarget: { value: nextValue },
		} as ChangeEvent<HTMLInputElement>);
	};

	const handleSelect = (nextValue: string) => {
		emitChange(nextValue);
		setIsOpen(false);
	};

	const handleBlur = () => {
		closeTimer.current = setTimeout(() => setIsOpen(false), 100);
	};

	const handleFocus = () => {
		if (closeTimer.current) {
			clearTimeout(closeTimer.current);
		}
		setIsOpen(true);
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		return () => {
			if (closeTimer.current)
				clearTimeout(closeTimer.current);
		};
	}, []);

    // filteredOptions が変わったらハイライトをリセット
    useEffect(() => {
        setHighlightedIndex(-1);
    }, [filteredOptions]);

    // キーボード操作ハンドラ
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Escape") {
			setIsOpen(false);
			return;
		}

		if (!isOpen || filteredOptions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0) {
				handleSelect(filteredOptions[highlightedIndex].value);
            }
        }
    };

	return (
		<div ref={containerRef} className="relative">
			<input
				type="text"
				id={inputId}
				className={`w-full px-4 py-3 bg-white border-2 border-gray-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-gray-400 text-gray-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed pr-10 ${isOpen && filteredOptions.length > 0 ? "rounded-t-xl rounded-b-none" : "rounded-xl"}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
                onKeyDown={handleKeyDown}
				disabled={disabled}
				autoComplete="off"
				role="combobox"
				aria-expanded={isOpen}
				aria-controls={dropdownId}
				aria-autocomplete="list"
			/>
			<button
				type="button"
				onMouseDown={(e) => e.preventDefault()}
				onClick={() => setIsOpen((prev) => !prev)}
				disabled={disabled}
				className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 cursor-pointer disabled:cursor-not-allowed"
				aria-label="候補を表示"
				aria-expanded={isOpen}
				aria-controls={dropdownId}
			>
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

            <ComboBoxDropdown id={dropdownId} isMounted={isMounted} isOpen={isOpen} disabled={disabled} dropdownRef={dropdownRef} position={position} options={filteredOptions} value={value} onSelect={handleSelect} highlightedIndex={highlightedIndex} />
		</div>
	);
}
