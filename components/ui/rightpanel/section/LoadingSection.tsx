/**
 * レスポンス待ちの表示
 */
export default function LoadingSection() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 font-medium">言い訳を生成中...</p>
            </div>
        </div>
    );
}
