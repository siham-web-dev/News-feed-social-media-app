import CustomAvatar from "./CustomAvatar";
import AvatarUploadDialog from "./AvatarUploadDialog";

const AvatarProfile = ({
  url,
  isEditable,
}: {
  url: string;
  isEditable: boolean;
}) => {
  console.log("AvatarProfile url", url);

  return (
    <div className="flex flex-col items-center gap-2">
      <CustomAvatar url={url} size="large" />
      {isEditable && <AvatarUploadDialog />}
    </div>
  );
};

export default AvatarProfile;
