import express, { type Express, type Request, type Response } from 'express'
import 'dotenv/config'

import articleRoutes from './routes/articles'

const ENV: NodeJS.ProcessEnv = process.env
const app: Express = express()
const port = ENV?.PORT || '3000'

app.use(express.json())
app.use('/articles', articleRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.send('Simple Blog API')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
