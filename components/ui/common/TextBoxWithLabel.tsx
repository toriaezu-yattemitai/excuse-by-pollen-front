import { ChangeEvent } from "react";
import TextBox from "./TextBox";
import Label from "./Label";

/**
 * ラベル付きのテキストボックスの部品コンポーネント
 */
type TextBoxWithLabelProps = {
    label: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string | undefined,
    value: string | undefined,
};

export default function TextBoxWithLabel({ label, onChange, placeholder = "", value = "" }: TextBoxWithLabelProps) {
    return (
        <>
            <Label>{label}</Label>
            <TextBox onChange={onChange} placeholder={placeholder} value={value} />
        </>
        
    );
}
