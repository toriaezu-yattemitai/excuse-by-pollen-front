import { useState } from "react";
import type { GenerateRequest, GenerateResponse, RetryRequest } from "@/types/api";

// const API_URI = "/api/"; // モック環境
// const API_URI = "http://localhost:8000/"; // ローカル環境
const API_URI = "https://excuse-by-pollen-back.onrender.com/"; // 本番環境

export function useGenerate() {
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // エラー用に再送のための最後のリクエストをここに格納しておく
  const [lastRequest, setLastRequest] = useState<
    {
      type: 'generate' | 'retry', 
      data: GenerateRequest["inputs"] | string,
    }
    | null>(null);

  // 言い訳を生成する
  const handleGenerate = async (inputs: GenerateRequest["inputs"], options?: Partial<GenerateRequest["options"]>) => {
    setIsLoading(true);
    setError(null);
    setLastRequest({ type: 'generate', data: inputs });

    try {
      const payload: GenerateRequest = {
        inputs,
        options: { max_chars: 220, ...options },
      };

      const response = await fetch(API_URI + "generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "生成に失敗しました");
      }

      const data: GenerateResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      console.error("Generate error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // もっと盛る
  const handleRetry = async (retryInstruction: string) => {
    if (!result) {
      setError("再生成できる結果がありません");
      return;
    }

    setIsLoading(true);
    setError(null);
    setLastRequest({ type: 'retry', data: retryInstruction });

    try {
      const payload: RetryRequest = {
        previous_context: result.used_inputs,
        previous_excuse: result.excuse,
        retry_instruction: retryInstruction,
      };

      const response = await fetch(API_URI + "retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "再生成に失敗しました");
      }

      const data: GenerateResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      console.error("Retry error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 再送する
  const handleResend = () => {
    if (!lastRequest) return;

    if (lastRequest.type === 'generate') {
      handleGenerate(lastRequest.data as GenerateRequest["inputs"]);
      return;
    }
    
    if (lastRequest.type === 'retry') {
      handleRetry(lastRequest.data as string);
      return;
    }
  };

  return { result, isLoading, error, handleGenerate, handleRetry, handleResend };
}
