"use client";

import { useState } from "react";
import Button from "./common/Button";
import TextBoxWithLabel from "./common/TextBoxWithLabel";
import NumberSliderWithLabel from "./common/NumberSliderWithLabel";
import type { GenerateRequest } from "@/types/api";
import CheckBoxWithLabel from "./common/CheckBoxWithLabel";
import ComboBoxWithLabel from "./common/ComboBoxWithLabel";

type Props = {
  onGenerate: (inputs: GenerateRequest["inputs"], options?: Partial<GenerateRequest["options"]>) => void,
  isLoading: boolean,
};

/**
 * ブラウザから現在位置（緯度・経度）を取得する
 */
const getCurrentLocation = (onError?: (msg: string) => void): Promise<{ latitude: number; longitude: number } | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      onError?.("お使いのブラウザは位置情報に対応していません。");
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let message = "位置情報の取得に失敗しました。";
        if (error.code === error.PERMISSION_DENIED) {
          message = "位置情報へのアクセスが拒否されました。";
        } else if (error.code === error.TIMEOUT) {
          message = "位置情報の取得がタイムアウトしました。";
        }
        onError?.(message);
        resolve(null);
      },
      { enableHighAccuracy: false, maximumAge: 60000 }
    );
  });
};

/**
 * 左側の入力パネルコンポーネント
 */
export default function LeftPanel({ onGenerate, isLoading }: Props) {
  const [target, setTarget] = useState("");
  const [symptom, setSymptom] = useState("");
  const [situation, setSituation] = useState("");
  const [level, setLevel] = useState(3);
  const [nuance, setNuance] = useState("");
  const [useLocation, setUseLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  /**
   * 位置情報チェックボックスの変更ハンドル
   */
  const handleLocationCheckChange = async (checked: boolean) => {
    if (checked) {
      // チェックされたら、位置情報の許可を求める
      const location = await getCurrentLocation(setLocationError);
      if (location) {
        setUseLocation(true);
        return;
      }

      setUseLocation(false);
      return;
    }
    setLocationError(null);
    setUseLocation(false);
  };

  const handleSubmit = async () => {
    // バリデーション
    if (!symptom.trim()) {
      alert("症状を入力してください");
      return;
    }

    // 位置情報の取得（チェックがONの場合のみ）
    let locationData: { latitude: number; longitude: number } | null = null;
    if (useLocation) {
      locationData = await getCurrentLocation();
    }

    // API送信用のデータを作成
    const inputs: GenerateRequest["inputs"] = {
      symptoms: [symptom.trim()],
      level: level,
      target: target.trim() || null,
      situation: situation.trim() || null,
      nuance: nuance.trim() || null,
    };

    // options の組み立て（location があれば含める）
    const options: Partial<GenerateRequest["options"]> = {};
    if (locationData) {
      options.location = locationData;
    }

    onGenerate(inputs, options);
  };

  return (
    <div className="flex flex-col h-full bg-white m-2 p-6 rounded-xl border-[3px] border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex-1 space-y-6 overflow-y-auto">
        {/* 症状入力 */}
        <div className="space-y-2">
          <TextBoxWithLabel id="symptom"
            label={<>症状 <span className="text-xs font-black text-white bg-pink-500 px-1.5 py-0.5 rounded-md">必須</span></>}
            placeholder="例：鼻水が止まらない" value={symptom} disabled={isLoading} onChange={(e) => setSymptom(e.target.value)}
          />
        </div>

        {/* 相手入力 */}
        <div className="space-y-2">
          <TextBoxWithLabel id="target" label="相手" placeholder="例：上司、先生" value={target} disabled={isLoading}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>

        {/* 状況入力 */}
        <div className="space-y-2">
          <TextBoxWithLabel id="situation" label="状況" placeholder="例：大事な会議前" value={situation} disabled={isLoading}
            onChange={(e) => setSituation(e.target.value)}
          />
        </div>

        {/* 花粉症レベル */}
        <div className="space-y-4 pt-2">
          <NumberSliderWithLabel id="level" label="花粉症レベル" min={1} max={5} step={1} value={level} disabled={isLoading}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          />
        </div>

        {/* ニュアンス/文体 */}
        <div className="space-y-2">
          <ComboBoxWithLabel id="nuance" label="ニュアンス/文体" placeholder="例：ポエム風、ビジネスライク" value={nuance} disabled={isLoading} onChange={(e) => setNuance(e.target.value)}>
            <option value="ポエム風">ポエム風</option>
            <option value="ビジネスライク">ビジネスライク</option>
            <option value="深刻">深刻</option>
            <option value="軽いタッチ">軽いタッチ</option>
            <option value="ユーモア">ユーモア</option>
            <option value="ファンタジー風">ファンタジー風</option>
          </ComboBoxWithLabel>
        </div>

        {/* 位置情報取得の同意チェックボックス */}
        <div className="space-y-1 pt-2">
          <div className="font-semibold flex items-start gap-3 p-4 bg-pink-50 rounded-xl border-2 border-pink-400">
            <CheckBoxWithLabel id="use-location" label="現在地の花粉データを取得する" checked={useLocation} disabled={isLoading} onChange={(e) => handleLocationCheckChange(e.target.checked)} />
          </div>
          {locationError ? (
            <span className="text-xs text-red-500">{locationError}</span>
          ) : (
            <span className="text-xs text-gray-500">
              ※位置情報はサーバー上で市区町村に変換され、そのままでの処理や保存はしません。
            </span>
          )}
        </div>
      </div>

      {/* 生成ボタン */}
      <div className="pt-6 mt-4 border-t-2 border-gray-200">
        <Button id="generate" onClick={handleSubmit} color="pink" disabled={isLoading}>
          <span>{isLoading ? "生成中..." : "言い訳を生成する"}</span>
        </Button>
      </div>
    </div>
  );
}
