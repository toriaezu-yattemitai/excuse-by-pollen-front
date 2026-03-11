import Image from "next/image";

/**
 * ヘッダーコンポーネント
 */
export default function Header() {
  return (
    <div className="z-10 shadow-sm">
      {/* 斜めストライプバー */}
      <div className="h-3 w-full border-l-3 border-r-3 border-t-3 rounded-t-xl border-gray-800" style={{
        background: 'repeating-linear-gradient(-45deg, #f59e0b, #f59e0b 10px, #fcd34d 10px, #fcd34d 20px)'
      }} />
      {/* タイトルバー */}
      <div className="bg-white px-4 py-2 border-[3px] border-gray-800">
        <div className="flex items-center gap-2">
          {/* <span className="text-lg lg:text-2xl" aria-hidden="true">🌲💨🤧</span> */}
          <Image src="/icon.png" alt="アイコン" width={25} height={25} />
          <h1 className="font-black text-xs min-[400px]:text-sm min-[440px]:text-base lg:text-xl tracking-tight">
            <span className="text-gray-800">花粉症・限界突破</span>
            <span className="text-pink-500 ml-1">エクスキューズジェネレーター</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
