import NotificationToast from "@/components/custom/NotificationToast";
import { toast } from "react-hot-toast";
import { NotificationMetaData } from "../dtos/notification.dto";

const useMessages = () => {
  const showMessage = (
    description: string,
    type: "success" | "error" | "notifications",
    metaData?: NotificationMetaData
  ) => {
    if (type === "success") {
      toast.success(description, {
        position: "top-right",
      });
    } else if (type === "error") {
      toast.error(description, {
        position: "top-right",
      });
    } else if (type === "notifications") {
      toast.custom(
        (t) => (
          <NotificationToast
            isVisible={t.visible}
            dismiss={() => toast.dismiss(t.id)}
            avatarUrl={metaData?.avatarUrl as string}
            displayName={metaData?.displayName as string}
            content={metaData?.content as string}
          />
        ),
        {
          position: "bottom-right",
        }
      );
    } else {
      toast(description, {
        position: "top-right",
      });
    }
  };

  return { showMessage };
};

export default useMessages;
