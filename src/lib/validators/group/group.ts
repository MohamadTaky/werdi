import z from "zod";

export const postRequestValidator = z.object({ name: z.string() });
export type postRequestType = z.infer<typeof postRequestValidator>;
