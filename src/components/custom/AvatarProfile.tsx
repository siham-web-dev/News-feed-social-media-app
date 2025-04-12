import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import CustomAvatar from "./CustomAvatar";

const AvatarProfile = ({
  url,
  isEditable,
}: {
  url: string;
  isEditable: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <CustomAvatar url={url} size="large" />
      {isEditable && (
        <Button variant={"outline"}>
          <FaEdit />
          <span> Edit Image</span>
        </Button>
      )}
    </div>
  );
};

export default AvatarProfile;
