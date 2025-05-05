import {  productStatuses } from "@/drizzle/schema/product";
import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1),
    status: z.enum(productStatuses),
    priceInDollars: z.number().int().nonnegative(),
    description: z.string().transform((v) => v || ''),
    imageUrl: z.union([
        z.string().url('Must be a valid URL'),
        z.string().startsWith('/','Invalid Image Path')
    ]),
    courseIds: z.array(z.string()).min(1),
    
})