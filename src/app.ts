import express, { type Express, type Request, type Response } from 'express'
import 'dotenv/config'

const ENV: NodeJS.ProcessEnv = process.env
const app: Express = express()
const port = ENV?.PORT || '3000'

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
