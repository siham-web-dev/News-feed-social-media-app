import { toast } from "sonner";

const useMessages = () => {
  const showMessage = (
    description: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    let className = "";
    if (type === "success") {
      className = "bg-green-800 text-white";
    } else if (type === "error") {
      className = "bg-red-800 text-white";
    } else if (type === "warning") {
      className = "bg-amber-800 text-white";
    } else {
      className = "bg-blue-50 text-black";
    }
    toast(description, {
      position: "top-left",
      className,
    });
  };

  return { showMessage };
};

export default useMessages;
