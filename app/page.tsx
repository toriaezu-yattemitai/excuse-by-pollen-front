import Header from "@/components/ui/Header";
import { metadata } from "./layout";
import LeftPanel from "@/components/ui/LeftPanel";
import RightPanel from "@/components/ui/RightPanel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title={metadata.title as string} />
      
      {/* メインコンテンツエリア：左右2カラムレイアウト */}
      <main className="flex-1 container mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* 左パネル */}
          <div className="h-full">
            <LeftPanel />
          </div>
          
          {/* 右パネル */}
          <div className="h-full">
            <RightPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
