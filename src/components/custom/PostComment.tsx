import dayjs from "dayjs";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import CustomAvatar from "./CustomAvatar";
import Link from "next/link";

const PostComment = ({
  avatarUrl,
  displayName,
  createdAt,
  content,
  userUuid,
  hasSeparator,
}: {
  avatarUrl: string;
  displayName: string;
  createdAt: Date;
  content: string;
  userUuid: string | undefined;
  hasSeparator: boolean;
}) => {
  return (
    <>
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="flex gap-4">
            <CustomAvatar url={avatarUrl} size="small" />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Link href={`/profile/${userUuid}`}>
                  <span className="font-medium">{displayName}</span>
                </Link>
                <small className="text-[10px]">
                  {dayjs(createdAt).fromNow()}
                </small>
              </div>
              <p className="text-sm text-muted-foreground">{content}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {hasSeparator && <Separator className="my-6" />}
    </>
  );
};

export default PostComment;
