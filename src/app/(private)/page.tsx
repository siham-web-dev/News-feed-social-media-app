import Posts from "@/components/custom/Posts";
import TopTopics from "@/components/custom/TopTopics";
import WhoToFollow from "@/components/custom/WhoToFollow";

export default function Home() {
  return (
    <>
      <Posts />
      <div className="mx-3 sm:w-[270px]">
        <WhoToFollow />
        <TopTopics />
      </div>
    </>
  );
}
