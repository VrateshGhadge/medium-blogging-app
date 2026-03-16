import { Hono } from 'hono'
const app = new Hono()

app.post('/api/v1/signup', (c) => c.text('Hono!'))

app.post('/api/v1/signin', (c) => c.text('Hono!'))

app.post('/api/v1/blog', (c) => c.text('Hono!'))

app.put('/api/v1/blog', (c) => c.text('Hono!'))

app.get('/api/v1/blog/:id', (c) => c.text('Hono!'))

app.get('./api/v1/blog/bulk')

export default app 