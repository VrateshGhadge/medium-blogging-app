import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from 'medium-validn-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json() 
  const { success } = signupInput.safeParse(body)
  if(!success){
    c.status(400)
    return c.json({
      error: "Inputs are not valid"
    })
  }


  try{
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    })

    if (!user){
      c.status(403)
      return c.json({
        message: "Incorrect credientials"
      })
      }

    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({
      jwt: token
    })
  } catch(e){
    c.status(403)
    return c.json({
      error: "User already exist with this email"
    })
  }
})

userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL, 
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = signinInput.safeParse(body)
  if(!success){
    c.status(400)
    return c.json({
      error: "Inputs are not valid"
    })
  }
  try{
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      },
    })

    if(!user || user.password !== body.password ){
      // c.status(401);
      // return c.json({error: '-----'})
      //      OR
      return c.json({error: 'Invalid email or password'}, 401)
    }

    const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({jwt})
  } catch(e){
    c.status(403)
    return c.json({
      error: "Invalid credientials"
    })
  }
})