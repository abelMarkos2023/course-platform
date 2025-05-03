import { lessonStatusEnum } from "@/drizzle/schema/lesson";
import { z } from "zod";

export const createLessonSchema = z.object({
    name: z.string().min(1),
    status: z.enum(lessonStatusEnum.enumValues),
    youtubeVideoId: z.string().min(1),
    description: z.string().transform((v) => v || null).nullable(),
    order: z.number(),
    sectionId: z.string().min(1),
    
})