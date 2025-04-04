import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Posts from "./Posts";

export default function ProfileTabs() {
  return (
    <Tabs
      defaultValue="account"
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
        <Posts type="owner" />
      </TabsContent>
      <TabsContent value="s-posts">
        <Posts type="saved" />
      </TabsContent>
    </Tabs>
  );
}
