/**
 * API リクエスト・レスポンスの型定義
 */

// 生成APIリクエストの入力データ
export type GenerateInputs = {
  symptoms: string[]; // 必須
  level: number; // 必須 (1-5)
  target: string | null; // 任意（nullの場合AIが補完）
  situation: string | null; // 任意（nullの場合AIが補完）
  nuance: string | null; // 任意（nullの場合AIが補完）
};

// 生成APIリクエスト本体
export type GenerateRequest = {
  inputs: GenerateInputs;
  options: {
    max_chars: number;
  };
};

// AIが補完した入力データ（レスポンスで返ってくる）
export type UsedInputs = {
  target: string;
  symptoms: string[];
  situation: string;
  level: number;
  nuance: string;
};

// 生成APIレスポンス
export type GenerateResponse = {
  excuse: string, // 生成された言い訳テキスト
  score: number, // 説得力スコア (0-100)
  id: string, // 生成ID
  used_inputs: UsedInputs, // AIが補完した設定を含む入力データ
  options?: {
    badges?: Record<string, string>, // badges には location, pollen-index, pollen-speciesなどが入る想定、値をバッジとしてUIに表示する
  },
};

// 再生成APIリクエスト
export type RetryRequest = {
  previous_context: UsedInputs;
  previous_excuse: string;
  retry_instruction: string;
};

// 再生成APIレスポンス
export type RetryResponse = GenerateResponse;
