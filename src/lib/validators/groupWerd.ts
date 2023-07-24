import z from "zod";

export const postRequestValidator = z.object({ text: z.string(), count: z.string() });
export type postRequestType = z.infer<typeof postRequestValidator>;
