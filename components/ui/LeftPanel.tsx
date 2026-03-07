"use client";

import { useState } from "react";
import Button from "./common/Button";
import TextBoxWithLabel from "./common/TextBoxWithLabel";
import NumberSliderWithLabel from "./common/NumberSliderWithLabel";
import SelectBoxWithLabel from "./common/SelectBoxWithLabel";
import type { GenerateRequest } from "@/types/api";
import CheckBoxWithLabel from "./common/CheckBoxWithLabel";

type Props = {
  onGenerate: (inputs: GenerateRequest["inputs"], options?: Partial<GenerateRequest["options"]>) => void,
  isLoading: boolean,
};

/**
 * ブラウザから現在位置（緯度・経度）を取得する
 */
const getCurrentLocation = (): Promise<{ latitude: number; longitude: number } | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      alert("お使いのブラウザは位置情報に対応していません。");
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
        let message = "位置情報の取得に失敗しました。\n";
        if (error.code === error.PERMISSION_DENIED) {
          message += "位置情報へのアクセスが拒否されました。";
        } else if (error.code === error.TIMEOUT) {
          message += "位置情報の取得がタイムアウトしました。";
        } else {
          message += "位置情報を取得できませんでした。";
        }
        alert(message + "\n\n位置情報なしで生成を続けます。");
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
  const [nuance, setNuance] = useState("ポエム風");
  const [useLocation, setUseLocation] = useState(false);

  /**
   * 位置情報チェックボックスの変更ハンドル
   */
  const handleLocationCheckChange = async (checked: boolean) => {
    if (checked) {
      // チェックされたら、位置情報の許可を求める
      const location = await getCurrentLocation();
      if (location) {
        // 許可が得られた場合のみチェックをONにする
        setUseLocation(true);
        return;
      }
    }
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
      nuance: nuance || null,
    };

    // options の組み立て（location があれば含める）
    const options: Partial<GenerateRequest["options"]> = {};
    if (locationData) {
      options.location = locationData;
    }

    onGenerate(inputs, options);
  };

  return (
    <div className="flex flex-col h-full bg-white m-1 p-6 rounded-xl border border-blue-100">
      <div className="flex-1 space-y-6 overflow-y-auto">
        {/* 相手入力 */}
        <div className="space-y-2">
          <TextBoxWithLabel label="相手" placeholder="例：上司、先生" value={target} disabled={isLoading}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>

        {/* 症状入力 */}
        <div className="space-y-2">
          <TextBoxWithLabel label="症状" placeholder="例：鼻水が止まらない" value={symptom} disabled={isLoading}
            onChange={(e) => setSymptom(e.target.value)}
          />
        </div>

        {/* 状況入力 */}
        <div className="space-y-2">
          <TextBoxWithLabel label="状況" placeholder="例：大事な会議前" value={situation} disabled={isLoading}
            onChange={(e) => setSituation(e.target.value)}
          />
        </div>

        {/* 花粉症レベル */}
        <div className="space-y-4 pt-2">
          <NumberSliderWithLabel label="花粉症レベル" min={1} max={5} step={1} value={level} disabled={isLoading}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          />
        </div>

        {/* ニュアンス/文体 */}
        <div className="space-y-2">
          <SelectBoxWithLabel label="ニュアンス/文体" value={nuance} disabled={isLoading}
            onChange={(e) => setNuance(e.target.value)}
          >
            <option value="ポエム風">ポエム風</option>
            <option value="ビジネスライク">ビジネスライク</option>
            <option value="深刻">深刻</option>
            <option value="軽いタッチ">軽いタッチ</option>
            <option value="ユーモア">ユーモア</option>
          </SelectBoxWithLabel>
        </div>

        {/* 位置情報取得の同意チェックボックス */}
        <div className="space-y-1 pt-2">
          <div className="font-semibold flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <CheckBoxWithLabel id="use-location" label="現在地の花粉データを取得する" checked={useLocation} disabled={isLoading} onChange={(e) => handleLocationCheckChange(e.target.checked)} />
          </div>
          <span className="text-xs text-gray-500">
            ※位置情報は取得のみに使用され保存されません
          </span>
        </div>
      </div>

      {/* 生成ボタン */}
      <div className="pt-6 mt-4 border-t border-gray-100">
        <Button onClick={handleSubmit} color="blue" disabled={isLoading}>
          <span>{isLoading ? "生成中..." : "言い訳を生成する"}</span>
        </Button>
      </div>
    </div>
  );
}
