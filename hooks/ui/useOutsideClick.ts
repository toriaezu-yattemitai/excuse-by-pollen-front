import { RefObject, useEffect } from "react";

export function useOutsideClick(refs: Array<RefObject<HTMLElement | null>>, enabled: boolean, onOutsideClick: () => void) {
    useEffect(() => {
        if (!enabled) return;

        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as Node;
            const isInside = refs.some((ref) => ref.current?.contains(target));
            if (!isInside) onOutsideClick();
        };

        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, [refs, enabled, onOutsideClick]);
}