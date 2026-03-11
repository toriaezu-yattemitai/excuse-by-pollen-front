import { ChangeEvent, ReactNode, useId } from "react";
import CheckBox from "./CheckBox";
import Label from "./Label";

/**
 * チェックボックスの部品コンポーネント
 */
type Props = {
    id?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    label: string | ReactNode,
    disabled?: boolean,
    checked: boolean,
};

export default function CheckBoxWithLabel({ id, onChange, label, checked, disabled = false }: Props) {
    const generatedId = useId();
    id = id || generatedId; // idが指定されていない場合はuseId()から利用する

    return (
        <>
            <CheckBox onChange={onChange} id={id} checked={checked} disabled={disabled} />
            <Label forId={id}>{label}</Label>
        </>
    );
}
