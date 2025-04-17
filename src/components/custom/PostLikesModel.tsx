import { getLikes } from "@/actions/like.actions";
import { useQuery } from "@tanstack/react-query";

const PostLikesModel = ({ postUuid }: { postUuid: string }) => {
  const { data } = useQuery({
    queryKey: [`post-likes-${postUuid}`],
    queryFn: () => getLikes({ postUuid }),
    staleTime: Infinity,
  });
  return <p>{data?.likes?.length || 0} Likes</p>;
};

export default PostLikesModel;
