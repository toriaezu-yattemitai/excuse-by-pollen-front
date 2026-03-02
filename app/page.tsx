import Header from "@/components/ui/Header";
import { metadata } from "./layout";
import LeftPanel from "@/components/ui/LeftPanel";
import RightPanel from "@/components/ui/RightPanel";

export default function Home() {
  return (
    <>
      <Header title={metadata.title as string} />
      <LeftPanel />
      <RightPanel />
    </>
  );
}
