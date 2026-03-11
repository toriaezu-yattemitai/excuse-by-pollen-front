"use client";

import ResultCard from "@/components/ui/rightpanel/ResultCard";
import TopButton from "./TopButton";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ErrorSection from "@/components/ui/rightpanel/section/ErrorSection";
import { useGetExcuse } from "@/hooks/useGetExcuse";
import LoadingSection from "@/components/ui/rightpanel/section/LoadingSection";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShareContent() {
  const params = useSearchParams();
  const [ text, setText] = useState("何も生成されていないようです...");
  const [ score, setScore ] = useState(-1);


  const { res, isLoading, error, handleGetExcuse } = useGetExcuse();

  let id = params.get('id') || null;

  useEffect(() => {

    if (id) {
      handleGetExcuse(id);
    } else {
      setText(params.get('text') ? params.get('text') as string : '何も生成されていないようです...');
      setScore(params.get('score') ? parseInt(params.get('score') as string) : -1);
    }
  }, []);

  useEffect(() => {
    if (res) {
      setText(res.excuse);
      setScore(res.score);
    }
  }, [res]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 pt-3 pb-4 lg:px-6 lg:pt-4 lg:pb-6 flex items-center justify-center">
        <div className="w-full max-w-xl">
          {isLoading ? (
            <LoadingSection msg={"データを取得中..."} />
          ) : error ? (
            <ErrorSection error={error} onResend={() => id && handleGetExcuse(id)} />
          ) : (
            <div className="bg-white rounded-xl border border-amber-100 p-6">
              <p className="text-xs font-semibold text-amber-500 tracking-widest uppercase mb-4">花粉症・限界突破エクスキューズジェネレーター</p>
              <ResultCard result={{ excuse: text, score: score }} />
            </div>
          )}
          <div className="pt-4 mt-2">
            <TopButton />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}