import NavBar from "@/components/custom/NavBar";
import Posts from "@/components/custom/Posts";
import SideBar from "@/components/custom/SideBar";
import TopTopics from "@/components/custom/TopTopics";
import WhoToFollow from "@/components/custom/WhoToFollow";

export default function Home() {
  return (
    <main className="flex flex-col-reverse h-screen sm:flex-row gap-2.5 overflow-x-hidden">
      <SideBar />
      <Posts />
      <div className="mx-3 sm:w-[270px]">
        <WhoToFollow />
        <TopTopics />
      </div>
      <NavBar />
    </main>
  );
}
