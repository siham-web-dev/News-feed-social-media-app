import Image from "next/image";

const NotificationToast = ({
  isVisible,
  avatarUrl,
  displayName,
  content,
  dismiss,
}: {
  isVisible: boolean;
  avatarUrl: string;
  displayName: string;
  content: string;
  dismiss: () => void;
}) => {
  return (
    <div
      className={`${
        isVisible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Image
              width={50}
              height={50}
              className="h-10 w-10 rounded-full"
              src={avatarUrl}
              alt="avatar"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="mt-1 text-sm text-gray-500">{content}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={dismiss}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
