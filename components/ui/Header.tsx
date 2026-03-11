/**
 * ヘッダーコンポーネント
 */
export default function Header() {
  return (
    <div className="z-10 shadow-sm">
      {/* 斋めストライプバー */}
      <div className="h-3 w-full" style={{
        background: 'repeating-linear-gradient(-45deg, #06b6d4, #06b6d4 10px, #67e8f9 10px, #67e8f9 20px)'
      }} />
      {/* タイトルバー */}
      <div className="bg-white px-4 py-2 border-b-2 border-cyan-100">
        <div className="flex items-center gap-2">
          <span className="text-lg lg:text-2xl" aria-hidden="true">🌲💨🤧</span>
          <h1 className="font-black text-sm min-[350px]:text-base lg:text-xl tracking-tight">
            <span className="text-gray-800">花粉症・限界突破 </span>
            <span className="text-pink-500">エクスキューズジェネレーター</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
