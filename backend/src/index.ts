import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

//routing
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


//middleware
// app.use('/api/v1/blog/*', async (c, next) => {
//   const authHeader = c.req.header("authorization") || ""
//   const response = await verify(authHeader, c.env.JWT_SECRET, "HS256")

//   if(response.id){
//     next()
//   } else {
//     c.status(403)
//     return c.json({
//       error: "unauthorized"
//     }) 
//   }
//   await next()
// })

//zod validation and pass hashing-> salting etc


export default app
