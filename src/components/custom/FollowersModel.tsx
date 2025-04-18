import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import UserItem from "./UserItem";
import { UserResult } from "@/lib/types/response";
import { useSession } from "./SessionProvider";

const FollowModel = ({
  count,
  data,
  type,
}: {
  count: number;
  data: UserResult[] | undefined;
  type: "followers" | "followings";
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useSession();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="flex gap-1 items-center cursor-pointer  text-[12px] md:text-[16px]"
        >
          <span>{count}</span>
          <span className="text-gray-500 font-semibold">{type}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[600px] overflow-y-auto">
        <DialogTitle>{type.toUpperCase()}</DialogTitle>
        {data && data?.length > 0 ? (
          data?.map((d) => (
            <div key={d.id}>
              <UserItem
                id={d.id}
                avatarUrl={d.profile?.avatarUrl as string}
                displayName={d.profile?.displayName as string}
                username={d.username}
                isCurrentUser={d.id === user?.id}
              />
            </div>
          ))
        ) : (
          <p>No {type}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowModel;
