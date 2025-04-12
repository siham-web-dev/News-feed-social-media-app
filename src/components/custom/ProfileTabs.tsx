import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Posts from "./Posts";
import {
  getAllCurrentUserPosts,
  getAllSavedPosts,
} from "@/actions/post.actions";

export default async function ProfileTabs() {
  return (
    <Tabs
      defaultValue="y-posts"
      className="w-full md:w-[600px] lg:w-[800px] mx-auto"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="y-posts"
          className="text-black bg-blue-50 p-2 font-semibold"
        >
          Your posts
        </TabsTrigger>
        <TabsTrigger
          value="s-posts"
          className="text-black bg-blue-50 p-2  font-semibold"
        >
          Saved posts
        </TabsTrigger>
      </TabsList>
      <TabsContent value="y-posts">
        <Posts callBack={getAllCurrentUserPosts} height="fit-screen" />
      </TabsContent>
      <TabsContent value="s-posts">
        <Posts callBack={getAllSavedPosts} height="fit-screen" />
      </TabsContent>
    </Tabs>
  );
}
