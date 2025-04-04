import AvatarProfileUpload from "@/components/custom/AvatarProfileUpload";
import ProfileInfo from "@/components/custom/ProfileInfo";
import ProfileTabs from "@/components/custom/ProfileTabs";

const ProfilePage = () => {
  return (
    <div className="flex gap-5 flex-col w-full items-start h-full mt-3">
      <div className="flex gap-5 items-center bg-white rounded-2xl p-7 md:w-[600px] lg:w-[800px] mx-auto">
        <AvatarProfileUpload />
        <ProfileInfo />
      </div>
      <ProfileTabs />
    </div>
  );
};

export default ProfilePage;
