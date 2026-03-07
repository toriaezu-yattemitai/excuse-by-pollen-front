import { ChangeEvent, useId } from "react";
import TextBox from "./TextBox";
import Label from "./Label";

/**
 * ラベル付きのテキストボックスの部品コンポーネント
 */
type TextBoxWithLabelProps = {
    id?: string,
    label: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string | undefined,
    value: string | undefined,
    disabled?: boolean,
};

export default function TextBoxWithLabel({ id, label, onChange, placeholder = "", value = "", disabled = false }: TextBoxWithLabelProps) {
    const generatedId = useId();
    id = id || generatedId; // idが指定サれていない場合はuseId()から利用する

    return (
        <>
            <Label forId={id}>{label}</Label>
            <TextBox id={id} onChange={onChange} placeholder={placeholder} value={value} disabled={disabled} />
        </>
        
    );
}
