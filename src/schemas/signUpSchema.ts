import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(2, "Username must more than 2 charactors")
    .min(20, "Username not more than 20 charactors")
    .regex(/[a-zA-Z0-9_]+$/, "Username must not contain special charactor")


export const signUpValidation = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid Email Address"}),
    password: z.string().min(6, {message: "password must be 6 charactors"}),
    
})