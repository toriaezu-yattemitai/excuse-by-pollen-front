import { useState } from "react";
import type { GenerateResponse } from "@/types/api";
import fetchApi from "./utils/APIUtil";

export function useGetExcuse() {
  const [res, setRes] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 言い訳を生成する
  const handleGetExcuse = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchApi("get-excuse/?" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "データの取得に失敗しました");
      }

      setRes(await response.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
      console.error("GetExcuse error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return { res, isLoading, error, handleGetExcuse };
}
