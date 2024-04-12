import {z} from "zod"

export const acceptmessageSchema = z.object({
    acceptingMessage: z.boolean()
    
})