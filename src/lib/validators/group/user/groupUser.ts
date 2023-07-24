import { z } from "zod";

export const postRequestValidator = z.object({ userIds: z.array(z.string()) });
export type postRequestType = z.infer<typeof postRequestValidator>;

export const deleteRequestValidator = z.object({ userIds: z.array(z.string()) });
export type deleteRequestType = z.infer<typeof postRequestValidator>;
