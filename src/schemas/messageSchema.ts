import {z} from "zod"

export const messageSchema = z.object({
    content: z
        .string()
        .min(10, {message: "Content must be at least 10 charactor"})
        .max(300, {message: "Content no longer then 300 charactor"}) 
})