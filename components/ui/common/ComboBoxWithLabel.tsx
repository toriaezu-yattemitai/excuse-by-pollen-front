import { ChangeEvent, ReactNode, useId } from "react";
import Label from "./Label";
import ComboBox from "./ComboBox";

/**
 * コンボボックスの部品コンポーネント (選択ボックス＋テキストボックス)
 */
type Props = {
	id?: string,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	placeholder?: string,
	value?: string,
    label: string | ReactNode,
	disabled?: boolean,
	children: ReactNode,
};

export default function ComboBoxWithLabel({ id, onChange, placeholder = "", value = "", label, disabled = false, children }: Props) {
	const generatedId = useId();
    id = id || generatedId; // idが指定されていない場合はuseId()から利用する

	return (
		<>
			<Label forId={id}>{label}</Label>
			<ComboBox id={id} onChange={onChange} placeholder={placeholder} value={value} disabled={disabled}>
				{children}
			</ComboBox>
		</>
	);
}
