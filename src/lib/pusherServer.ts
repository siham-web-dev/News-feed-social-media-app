import Pusher from "pusher";
import { PUSHER_CHANNEL_CONFIG } from "./constants";

class PusherServer {
  private static instance: Pusher;

  private constructor() {}

  public static getInstance(): Pusher {
    if (!PusherServer.instance) {
      PusherServer.instance = new Pusher(PUSHER_CHANNEL_CONFIG);
    }
    return PusherServer.instance;
  }
}

export default PusherServer;
