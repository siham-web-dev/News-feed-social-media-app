import { getLikes } from "@/actions/like.actions";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import UserItem from "./UserItem";
import { useSession } from "./SessionProvider";

const PostLikesModel = ({ postUuid }: { postUuid: string }) => {
  const { data } = useQuery({
    queryKey: [`post-likes-${postUuid}`],
    queryFn: () => getLikes({ postUuid }),
    staleTime: Infinity,
  });
  const { user } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  //  <p></p>
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:underline hover:cursor-pointer w-fit">
          {data?.likes?.length || 0} Likes
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[600px] overflow-y-auto">
        <DialogTitle>Likes</DialogTitle>
        {data?.likes && data?.likes?.length > 0 ? (
          data?.likes.map((like) => (
            <div key={like.user.id}>
              <UserItem
                id={like.user.id}
                avatarUrl={like.user.profile?.avatarUrl as string}
                displayName={like.user.profile?.displayName as string}
                username={like.user.username}
                isCurrentUser={like.user.id === user?.id}
              />
            </div>
          ))
        ) : (
          <p>No Likes for this post</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostLikesModel;
