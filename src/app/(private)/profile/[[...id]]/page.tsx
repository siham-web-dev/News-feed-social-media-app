import AvatarProfile from "@/components/custom/AvatarProfile";
import ProfileInfo from "@/components/custom/ProfileInfo";
import ProfileTabs from "@/components/custom/ProfileTabs";
import AuthService from "@/services/auth.service";

const ProfilePage = async ({ params }: { params: { id?: string } }) => {
  const { user } = await AuthService.validateSession();
  const isCurrentUser = params.id
    ? user?.id == params.id
      ? true
      : false
    : true;

  return (
    <div className="flex gap-5 flex-col w-full items-start h-full mt-3">
      {isCurrentUser ? (
        <>
          <div className="flex gap-5 items-center bg-white rounded-2xl p-7 md:w-[600px] lg:w-[800px] mx-auto">
            <AvatarProfile />
            <ProfileInfo />
          </div>
          <ProfileTabs />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfilePage;
