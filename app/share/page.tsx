import ResultCard from "@/components/ui/rightpanel/ResultCard";
import { Metadata } from "next";
import TopButton from "./TopButton";

export async function generateMetadata({ searchParams }: { searchParams: { text?: string; score?: string } }): Promise<Metadata> {
  const params = await searchParams;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://excuse-by-pollen.vercel.app';
  const text = params.text || '';
  const score = params.score || '0';
  const ogImageUrl = `${baseUrl}/api/ogp-image?text=${encodeURIComponent(text)}&score=${score}`;
  
  return {
    title: "花粉エクスキューズジェネレーター",
    description: text || "花粉症を理由にした言い訳を生成するウェブアプリ",
    openGraph: {
      title: "花粉エクスキューズジェネレーター",
      description: text,
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
      title: "花粉エクスキューズジェネレーター",
      description: text,
      images: [ogImageUrl],
    },
  };
}

export default async function SharePage({ searchParams }: { searchParams: { text?: string; score?: string } }) {
  const params = await searchParams;
  const text = params.text || '何も生成されていないようです...';
  const score = params.score || '-1';
  
  return (
    <div className="bg-gray-50 mx-auto p-4 lg:p-6">
      <div className="w-full h-full bg-white m-1 p-6 rounded-xl border border-blue-100">
        <div className="max-w-xl mx-auto">
          <ResultCard result={
            {
              excuse: text,
              score: parseInt(score),
            }
          } />
        </div>

        <div className="pt-4 mt-4 border-t border-gray-100"></div>

        <div className="max-w-2xs mx-auto">        
          <TopButton />
        </div>
      </div>
    </div>
  );
}