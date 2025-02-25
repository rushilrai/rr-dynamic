import { z } from "zod";

export const SampleSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2).max(100),
    created_at: z.date(),
    updated_at: z.date(),
});

export type Sample = z.infer<typeof SampleSchema>;