import ResultCard from "@/components/ui/rightpanel/ResultCard";
import { Metadata } from "next";
import TopButton from "./TopButton";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export async function generateMetadata({ searchParams }: { searchParams: { text?: string; score?: string } }): Promise<Metadata> {
  const params = await searchParams;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://excuse-by-pollen.vercel.app';
  const text = params.text || '';
  const score = params.score || '0';
  const ogImageUrl = `${baseUrl}/api/ogp-image?text=${encodeURIComponent(text)}&score=${score}`;
  
  return {
    title: "花粉症・限界突破エクスキューズジェネレーター",
    description: text || "花粉症を理由にした言い訳を生成するウェブアプリ",
    openGraph: {
      title: "花粉症・限界突破エクスキューズジェネレーター",
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
      title: "花粉症・限界突破エクスキューズジェネレーター",
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
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-6">
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 pt-3 pb-4 lg:px-6 lg:pt-4 lg:pb-6 flex items-center justify-center">
        <div className="w-full max-w-xl" >
          <div className="bg-white rounded-xl border border-amber-100 p-6">
            <p className="text-xs font-semibold text-amber-500 tracking-widest uppercase mb-4">花粉症・限界突破エクスキューズジェネレーター</p>
            <ResultCard result={{ excuse: text, score: parseInt(score) }} />
            <div className="pt-4 mt-2">
              <TopButton />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
