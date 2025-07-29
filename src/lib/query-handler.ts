import { getCurrentUser } from "@/lib/session";
import { ApplicationError } from "@/lib/error";

export const withErrorHandling = <P extends unknown[], R>(
  querFn: (...params: P) => Promise<R>,
  context: string
): ((...params: P) => Promise<R>) => {
    return async (...params: P) => {
        try {
            return await querFn(...params);
        } catch (err) {
            console.error(context, err)
            throw new ApplicationError(context)
        }
    }
}

export const withUserId = <P extends unknown[], R>(
  querFn: (userId: number, ...params: P) => Promise<R>,
  context: string
): ((...params: P) => Promise<R>) => {
    return withErrorHandling(async (...params: P) => {
        const { userId } = await getCurrentUser();
        return querFn(userId, ...params)
    }, context)
}