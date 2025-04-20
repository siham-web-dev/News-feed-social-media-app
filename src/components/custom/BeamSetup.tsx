"use client";

import { useEffect } from "react";
import { Client } from "@pusher/push-notifications-web";
import { useSession } from "./SessionProvider";
import { PUSHER_BEAM_INSTANCE_ID } from "@/lib/constants";

const BeamSetup = () => {
  const { user } = useSession();

  useEffect(() => {
    const beamsClient = new Client({
      instanceId: PUSHER_BEAM_INSTANCE_ID || "",
    });

    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest(`user-${user?.id}`))
      .then(() => console.log("Successfully registered and subscribed!"))
      .catch(console.error);
  }, [user?.id]);

  return <></>;
};

export default BeamSetup;
