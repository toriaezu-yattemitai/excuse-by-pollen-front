/**
 * レスポンス待ちの表示
 */
export default function LoadingSection({msg = "言い訳を生成中..."}: {msg?: string}) {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-amber-500"></div>
            <p className="text-amber-700 font-black">🌲 {msg}</p>
            </div>
        </div>
    );
}
