import { courseSectionStatus } from "@/drizzle/schema/courseSection";
import { z } from "zod";

export const createCourseSectionSchema = z.object({
    name: z.string().min(1),
  status: z.enum(courseSectionStatus)
    
})