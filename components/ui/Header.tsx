/**
 * ヘッダーコンポーネント
 * @param title タイトル
 */
export default function Header({title}: Readonly<{title: string}>) {
  return (
    <div className="bg-white p-2 lg:p-5 shadow-sm z-10">
        <h1 className="text-black text-lg lg:text-xl">{title}</h1>
    </div>
  );
}
