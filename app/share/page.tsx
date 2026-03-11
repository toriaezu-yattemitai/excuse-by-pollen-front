import { Metadata } from "next";
import { Suspense } from "react";
import ShareContent from "./ShareContent";
import fetchApi from "@/hooks/utils/APIUtil";

export async function generateMetadata({ searchParams }: { searchParams: { id?: string, text?: string; score?: string } }): Promise<Metadata> {
  const params = await searchParams;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://excuse-by-pollen.vercel.app';

  let ogImageUrl = '';
  if (params.id) {
    const response = await fetchApi("get-excuse/" + params.id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      const excuse = data.excuse;
      const score = data.score;
      ogImageUrl = `${baseUrl}/api/ogp-image?text=${encodeURIComponent(excuse)}&score=${score}`;
    } else {
      ogImageUrl = `${baseUrl}/api/ogp-image?id=${params.id}`;
    }

  } else {
    const text = params.text || '何も生成されていないようです...';
    const score = params.score || '-1';
    ogImageUrl = `${baseUrl}/api/ogp-image?text=${encodeURIComponent(text)}&score=${score}`;
  }
  
  return {
    title: "花粉症・限界突破エクスキューズジェネレーター",
    description: "花粉症を理由にした言い訳を生成するウェブアプリ",
    openGraph: {
      title: "花粉症・限界突破エクスキューズジェネレーター",
      description: "花粉症を理由にした言い訳を生成するウェブアプリ",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "花粉エクスキューズ結果",
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "花粉症・限界突破エクスキューズジェネレーター",
      description: "花粉症を理由にした言い訳を生成するウェブアプリ",
      images: [ogImageUrl],
    },
  };
}

export default async function SharePage() {
  return (
    <Suspense fallback={null}>
      <ShareContent />
    </Suspense>
  )
}
