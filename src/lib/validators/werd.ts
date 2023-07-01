import z from "zod";

export const postRequestValidator = z.object({ count: z.string(), text: z.string() });
export type postRequestType = z.infer<typeof postRequestValidator>;

export const putRequestValidator = z.object({ id: z.string(), completed: z.boolean(), count: z.number() });
export type putRequestType = z.infer<typeof putRequestValidator>;