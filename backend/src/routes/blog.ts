import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

blogRouter.use('/*', (c, next) => {
  next()
})


blogRouter.post('/', async(c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL, 
  }).$extends(withAccelerate())

  await prisma

  c.text('Hono!')
})

blogRouter.put('/', (c) => {

  c.text('Hono!')
})

blogRouter.get('/:id', (c) => {

  c.text('Hono!')
})

blogRouter.get('/bulk', (c) => {
  
  c.text('Hono!')
})
