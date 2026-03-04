import { useState } from "react";
import type { GenerateRequest, GenerateResponse, RetryRequest } from "@/types/api";

// const API_URI = "/api/"; // モック環境
// const API_URI = "http://localhost:8000/"; // ローカル環境
const API_URI = "https://excuse-by-pollen-back.onrender.com/"; // 本番環境

export function useGenerate() {
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (inputs: GenerateRequest["inputs"]) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload: GenerateRequest = {
        inputs,
        options: { max_chars: 220 },
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

  const handleRetry = async (retryInstruction: string) => {
    if (!result) {
      setError("再生成できる結果がありません");
      return;
    }

    setIsLoading(true);
    setError(null);

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

  return { result, isLoading, error, handleGenerate, handleRetry };
}