/**
 * ヘッダーコンポーネント
 * @param title タイトル
 */
export default function Header({title}: Readonly<{title: string}>) {
  return (
    <div className="bg-white p-3 shadow-sm border-b border-gray-100 z-10">
        <h1 className="text-gray-800 text-lg lg:text-xl">{title}</h1>
    </div>
  );
}
