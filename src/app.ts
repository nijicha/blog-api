import express, { type Express, type Request, type Response } from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
import { join } from 'path'

import 'dotenv/config'
import 'module-alias/register'

import CONFIG from './config'

const ENV: NodeJS.ProcessEnv = process.env
const app: Express = express()
const port = ENV?.PORT || '3000'

app.use(cors(CONFIG.CORS.setting))
app.use(express.json())

// Dynamically import route files
const routesDir = join(__dirname, 'routes')
readdirSync(routesDir).forEach(async (filename: string) => {
  const route = join(routesDir, filename)

  try {
    const item = await import(route)
    const routeNamespace = `/${filename.replace(/\.route.ts$/, '')}`

    app.use(routeNamespace, item.default)
  } catch (error) {
    console.error(`Error loading route from ${filename}:`, error)
  }
})

app.get('/', (_req: Request, res: Response) => {
  res.send('Simple Blog API')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
