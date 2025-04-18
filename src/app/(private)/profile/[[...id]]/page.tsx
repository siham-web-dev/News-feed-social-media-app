import { getAllPostsByUserUuid } from "@/actions/post.actions";
import { getUserProfileInfoByUserUuid } from "@/actions/user.actions";
import AvatarProfile from "@/components/custom/AvatarProfile";
import Posts from "@/components/custom/Posts";
import ProfileInfo from "@/components/custom/ProfileInfo";
import ProfileTabs from "@/components/custom/ProfileTabs";
import AuthService from "@/services/auth.service";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { id?: string } }) => {
  const { id } = await params;
  const { user } = await AuthService.validateSession();
  const isCurrentUser = id ? (user?.id == id?.[0] ? true : false) : true;
  const userUuid = isCurrentUser ? user?.id : id?.[0];

  const data = await getUserProfileInfoByUserUuid(userUuid as string);

  if (!data) return notFound();

  return (
    <div className="flex gap-5 flex-col w-full items-start h-full mt-3">
      <div className="flex gap-5 items-center bg-white rounded-2xl p-7 md:w-[600px] lg:w-[800px] mx-auto">
        <AvatarProfile
          url={data.profile.avatarUrl}
          isEditable={isCurrentUser}
        />
        <ProfileInfo user={data} isEditable={isCurrentUser} />
      </div>
      {isCurrentUser ? (
        <ProfileTabs />
      ) : (
        <div className="w-full md:w-[600px] lg:w-[800px] mx-auto">
          <Posts
            height="fit-screen"
            callBack={async ({ page, size }) => {
              "use server";
              return getAllPostsByUserUuid({ page, size, userUuid });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
