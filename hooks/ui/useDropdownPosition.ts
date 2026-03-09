import { RefObject, useCallback, useEffect, useState } from "react";

export function useDropdownPosition(anchorRef: RefObject<HTMLElement | null>, isOpen: boolean, offsetY = -1) {
    const [position, setPosition] = useState<{ top: number, left: number, width: number }>({
        top: 0,
        left: 0,
        width: 0,
    });

    const updatePosition = useCallback(() => {
        if (!anchorRef.current) return;

        const rect = anchorRef.current.getBoundingClientRect();
        setPosition({
            top: rect.bottom + offsetY,
            left: rect.left,
            width: rect.width,
        });
    }, [anchorRef, offsetY]);

    useEffect(() => {
        if (!isOpen) return;

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isOpen, updatePosition]);

    return { position, updatePosition };
}