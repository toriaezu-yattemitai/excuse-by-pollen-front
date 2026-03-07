import { ChangeEvent, ReactNode, useId } from "react";
import Label from "./Label";
import SelectBox from "./SelectBox";

/**
 * ラベル付き選択ボックスの部品コンポーネント
 */
type SelectBoxWithLabelProps = {
    id?: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    value: string,
    label: string,
    children: ReactNode,
    disabled?: boolean,
};

export default function SelectBoxWithLabel({ id, onChange, value, label, children, disabled = false }: SelectBoxWithLabelProps) {
    const generatedId = useId();
    id = id || generatedId; // idが指定サれていない場合はuseId()から利用する

    return (
        <>
            <Label forId={id}>{label}</Label>
            <SelectBox id={id} onChange={onChange} value={value} disabled={disabled}>
                {children}
            </SelectBox>
        </>
    );
}
