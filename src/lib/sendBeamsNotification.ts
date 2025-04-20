import {
  NEXT_PUBLIC_BASE_URL,
  PUSHER_BEAM_INSTANCE_ID,
  PUSHER_BEAMS_SECRET_KEY,
} from "./constants";

export async function sendBeamsNotification({
  userId,
  type,
  fromUser,
  content,
}: {
  userId: string;
  type: "like" | "comment" | "follow";
  fromUser: { displayName: string };
  content?: string;
}) {
  const interests = [`user-${userId}`];

  const titleMap = {
    like: `${fromUser.displayName} liked your post "${content}`,
    comment: `${fromUser.displayName} commented: "${content}"`,
    follow: `${fromUser.displayName} followed you`,
  };

  const notification = {
    interests,
    web: {
      notification: {
        title: "New Notification",
        body: titleMap[type],
        deep_link: `${NEXT_PUBLIC_BASE_URL}/notifications`,
        icon: `${NEXT_PUBLIC_BASE_URL}/icon.png`,
      },
    },
  };

  // refactor the code of axios with fetch
  const response = await fetch(
    `https://${PUSHER_BEAM_INSTANCE_ID}.pushnotifications.pusher.com/publish_api/v1/instances/${PUSHER_BEAM_INSTANCE_ID}/publishes/interests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PUSHER_BEAMS_SECRET_KEY}`,
      },
      body: JSON.stringify(notification),
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
