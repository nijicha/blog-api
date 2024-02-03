import express, { type Express, type Request, type Response } from 'express'
import cors from 'cors'
import 'dotenv/config'

import CONFIG from './config'
import articleRoutes from './routes/articles/articles'

const ENV: NodeJS.ProcessEnv = process.env
const app: Express = express()
const port = ENV?.PORT || '3000'

app.use(cors(CONFIG.CORS.setting))
app.use(express.json())
app.use('/articles', articleRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.send('Simple Blog API')
})

// Handle middleware errors
app.use((err: Error, _req: Request, res: Response) => {
  if (ENV?.NODE_ENV === 'development') {
    console.error(err)
  }

  res.status(500).json({ message: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
