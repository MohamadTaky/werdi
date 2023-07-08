import z from "zod";

export const postRequestValidator = z.object({ text: z.string(), count: z.string() });
export type postRequestType = z.infer<typeof postRequestValidator>;

export const putRequestValidator = z.object({ count: z.string() });
export type putRequestType = z.infer<typeof putRequestValidator>;
