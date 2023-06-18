import z from "zod";

export const postRequestValidator = z.object({ count: z.string(), text: z.string() });
export type postRequestType = z.infer<typeof postRequestValidator>;

export const putRequestValidator = z.object({ id: z.string(), done: z.boolean() });
export type putRequestType = z.infer<typeof putRequestValidator>;

export const deleteRequestValidator = z.object({ id: z.string() });
export type deleteRequestType = z.infer<typeof deleteRequestValidator>;
