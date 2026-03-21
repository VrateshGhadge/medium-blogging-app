import { Hono } from "hono";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()


blogRouter.post('/', async(c) => {

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
