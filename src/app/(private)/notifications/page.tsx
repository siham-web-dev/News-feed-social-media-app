import NotificationsList from "@/components/custom/NotificationsList";

const pages = () => {
  return (
    <div className="flex flex-col  gap-3 h-screen  p-3  w-full">
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <NotificationsList />
      {/* <p className="text-gray-500">No notifications yet.</p> */}
    </div>
  );
};

export default pages;
