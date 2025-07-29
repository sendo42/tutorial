import { get } from "http";
import { createSafeActionClient } from "next-safe-action";
import { getCurrentUser } from "./session";

export const actionClient = createSafeActionClient();

export const authedClient = actionClient.use(async ({ next }) => {
    const { userId } = await getCurrentUser();
    // Return the next middleware with `userId` value in the context
    return next({ ctx: { userId } });
  });