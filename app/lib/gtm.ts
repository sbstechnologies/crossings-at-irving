import { sendGTMEvent } from "@next/third-parties/google";

export const gtmEvent = (event: string, data: Record<string, unknown> = {}) => {
  sendGTMEvent({
    event,
    ...data,
  });
};
