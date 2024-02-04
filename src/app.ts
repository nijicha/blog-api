import express, { type Express, type Request, type Response } from 'express'
import cors from 'cors'
import 'dotenv/config'

import CONFIG from './config'
import articlesRoute from './routes/articles.route'

const ENV: NodeJS.ProcessEnv = process.env
const app: Express = express()
const port = ENV?.PORT || '3000'

app.use(cors(CONFIG.CORS.setting))
app.use(express.json())

app.use('/articles', articlesRoute)

// FIXME: This is not working
// Dynamically import route files

// const routesDir = join(__dirname, 'routes')
// readdirSync(routesDir).forEach((filename: string) => {
//   if (filename.endsWith('.route.ts')) {
//     import(join(routesDir, filename))
//       .then(({ default: route }: { default: Router }) => {
//         const routePath = `/${filename.replace(/\.ts$/, '')}`
//         app.use(routePath, route)
//       })
//       .catch((error) => {
//         console.error(`Error loading route from ${filename}:`, error)
//       })
//   }
// })

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
