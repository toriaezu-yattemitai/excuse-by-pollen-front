import { ChangeEvent, ReactNode } from "react";
import Label from "./Label";
import SelectBox from "./SelectBox";

/**
 * ラベル付き選択ボックスの部品コンポーネント
 */
type SelectBoxWithLabelProps = {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    value: string,
    label: string,
    children: ReactNode,
    disabled?: boolean,
};

export default function SelectBoxWithLabel({ onChange, value, label, children, disabled = false }: SelectBoxWithLabelProps) {
    return (
        <>
            <Label>{label}</Label>
            <SelectBox onChange={onChange} value={value} disabled={disabled}>
                {children}
            </SelectBox>
        </>
    );
}
