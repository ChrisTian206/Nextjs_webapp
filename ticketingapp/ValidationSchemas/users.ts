import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(3, "name is required").max(50),
    username: z.string().min(3, "username is required").max(50),

    //password optional(): When user updates information, they dont have to pass-in pw again.
    password: z.string().min(8, "Password must be at least 8 chars").max(50).optional().or(z.literal("")),
    role: z.string().min(3, "Role is required").max(10),
})