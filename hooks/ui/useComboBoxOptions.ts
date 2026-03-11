import { ReactNode, useMemo } from "react";

export type ComboBoxOption = {
    value: string; // 値
    label: string; // 表示名
};

// ReactNode (child) を ComboOptionに
function toOption(node: ReactNode): ComboBoxOption | null {
    if (typeof node !== "object" || node === null || !("props" in node)) return null;

    const element = node as { props?: { value?: string; children?: ReactNode } };
    const value = typeof element.props?.value    === "string" ? element.props.value : "";
    const label = typeof element.props?.children === "string" ? element.props.children : value;

    if (!value) return null;

    return { value, label };
}

export function useComboBoxOptions(children: ReactNode, keyword: string) {
    // children から コンボボックスの一覧を作成する
    const options = useMemo(() => {
        const nodes = Array.isArray(children) ? children : [children];

        return nodes.map((node) => toOption(node)).filter((opt): opt is ComboBoxOption => opt !== null);
    }, [children]);

    // 部分一致フィルタ
    const filteredOptions = useMemo(() => {
        const q = keyword.trim().toLowerCase();
        if (!q) return options;

        // 完全一致している場合は、トグル操作時に他候補へ切り替えやすいよう全候補を表示する
        const hasExactMatch = options.some((option) =>
            option.label.toLowerCase() === q || option.value.toLowerCase() === q,
        );
        if (hasExactMatch) return options;

        return options.filter((option) => 
            (option.label.toLowerCase().includes(q) || option.value.toLowerCase().includes(q)));
    }, [options, keyword]);

    return { options, filteredOptions };
}
