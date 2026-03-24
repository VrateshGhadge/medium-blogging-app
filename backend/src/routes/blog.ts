import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
        ACCELERATE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
      userId: string
    }
}>()

blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const token = authHeader.split(" ")[1];
  const user = await verify(token, c.env.JWT_SECRET, "HS256")
  if(user){
    c.set("userId", user.id as string)
    await next()
  }else{
    c.status(403);
    return c.json({
      message: "You are not logged in"
    })
  }
})


blogRouter.post('/', async(c) => {
  const body = await c.req.json()
  const prisma = new PrismaClient({
    accelerateUrl: c.env.ACCELERATE_URL, 
  }).$extends(withAccelerate())

  const authorId = c.get("userId")
  const blog = await prisma.post.create({
    data:{
      title: body.title,
      content: body.content,
      // authorId: Number(authorId)
      authorId: authorId // returned -> "id": "093208b9-e14c-467c-9f3f-51d09c4535da"
    }
  })

  return c.json({
    id: blog.id
  })
})

blogRouter.put('/', async (c) => {
  const body = await c.req.json()
  const prisma = new PrismaClient({
    accelerateUrl: c.env.ACCELERATE_URL, 
  }).$extends(withAccelerate())

  const blog = await prisma.post.update({
    where:{
      id: body.id
    },
    data:{
      title: body.title,
      content: body.content,
    }
  })

  return c.json({
    id: blog.id
  })
})

//add pagination
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
    accelerateUrl: c.env.ACCELERATE_URL, 
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany();
  
  return c.json({
    blogs
  })
})


blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id")
  const prisma = new PrismaClient({
    accelerateUrl: c.env.ACCELERATE_URL, 
  }).$extends(withAccelerate())


  try{
    const blog = await prisma.post.findFirst({
      where:{
        id
      }
    })
    return c.json({
      blog
    })
  }catch(e){
    c.status(411);
    return c.json({
      message: "Error while fetching the blog post"
    })
  }
})

