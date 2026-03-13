import getCurrentLocation from "@/app/utils/LocationUtil";
import CheckBoxWithLabel from "../common/CheckBoxWithLabel";
import { useState } from "react";

type Props = {
    useLocation: boolean,
    setUseLocation: (use: boolean) => void,
    isLoading: boolean,
};

/**
 * 位置情報利用のチェックボックス
 */
export default function UseLocationCheckBox({ useLocation, setUseLocation, isLoading }: Props) {
    const [locationError, setLocationError] = useState<string | null>(null);

    const handleChange = async (checked: boolean) => {
        if (checked) {
            // チェックされたら、位置情報の許可を求める
            // 新しい取得処理開始時に過去のエラーをクリアする
            setLocationError(null);
            const location = await getCurrentLocation(setLocationError);
            if (location) {
                // 位置情報取得が成功した場合もエラーをクリアする
                setLocationError(null);
                setUseLocation(true);
                return;
            }

            setUseLocation(false);
            return;
        }
        setLocationError(null);
        setUseLocation(false);
    };

    return (
        <>
            <div className="font-semibold flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border-2 border-yellow-400">
                <CheckBoxWithLabel id="use-location" label="現在地の花粉データを利用する" checked={useLocation} disabled={isLoading} onChange={(e) => handleChange(e.target.checked)} />
            </div>
            {locationError ? (
                <span className="text-xs text-red-500">{locationError}</span>
            ) : (
                <span className="text-xs text-gray-500">
                    ※位置情報はサーバー上で市区町村に変換され、そのままでの処理や保存はしません。
                </span>
            )}
        </>
    );
}
