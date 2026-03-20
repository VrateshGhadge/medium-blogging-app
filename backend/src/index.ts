import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

//middleware
app.use('/api/v1/blog/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || ""
  const response = await verify(authHeader, c.env.JWT_SECRET, "HS256")

  if(response.id){
    next()
  } else {
    c.status(403)
    return c.json({
      error: "unauthorized"
    }) 
  }
  await next()
})

//zod validation and pass hashing-> salting etc
app.post('/api/v1/signup', async (c) => {
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL, 
  }).$extends(withAccelerate())

  const body = await c.req.json()

  try{
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    })

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

app.post('/api/v1/signin', async(c) => {
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL, 
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    },
  })

  if(!user){
    // c.status(401);
    // return c.json({error: '-----'})
    //      OR
    return c.json({error: 'Invalid email or password'}, 401)
  }

  const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
  return c.json({jwt})
})

app.post('/api/v1/blog', async(c) => {

  c.text('Hono!')
})

app.put('/api/v1/blog', (c) => {

  c.text('Hono!')
})

app.get('/api/v1/blog/:id', (c) => {

  c.text('Hono!')
})

app.get('./api/v1/blog/bulk', (c) => {
  
  c.text('Hono!')
})


export default app
