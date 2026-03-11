/**
 * 初期の画面（何も生成されていない状態）
 */
export default function InitialSection() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
                <p className="text-5xl">🌲💨🤧</p>
                <div className="bg-cyan-50 border-2 border-gray-800 rounded-2xl px-6 py-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-black text-gray-800 text-sm">左のフォームを入力して</p>
                    <p className="font-black text-pink-500 text-sm">言い訳を生成しよう！</p>
                </div>
            </div>
        </div>
    );
}
