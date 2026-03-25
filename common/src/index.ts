import { z } from 'zod'

export const signupInput = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().optional()
})

//type inference:

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

//type inference:

export type SigninInput = z.infer<typeof signinInput>

export const createBlogInput = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>