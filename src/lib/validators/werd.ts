import z from "zod";

export const postRequestValidator = z.object({ count: z.string(), text: z.string() });
export type postRequestType = z.infer<typeof postRequestValidator>;