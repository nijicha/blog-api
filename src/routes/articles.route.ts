import { Router, type Request, type Response } from 'express'
import {
  body,
  validationResult,
  type Result,
  type ValidationError,
  type ValidationChain
} from 'express-validator'
import type { WithId } from 'mongodb'
import type { Article } from '@/app/models/article'
import ArticleService from '@/app/services/article-service'

// TODO: Change this file structure to class or module. This cannot be tested.

const router: Router = Router()
const VALIDATION: ValidationChain[] = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required')
]
let articles: WithId<Article>[] = []

// Index
router.get('/', async (_req: Request, res: Response) => {
  const articleService = await ArticleService()
  articles = await articleService.list()
  res.json(articles)
})

// // Show
// router.get('/:id', (req: Request, res: Response) => {
//   const paramsId = parseInt(req.params.id, 10)
//   const article = articles.find((a) => a.id === paramsId)
//
//   if (article) {
//     res.json(article)
//   } else {
//     res.status(404).json({ message: 'Article not found' })
//   }
// })
//
// Create
router.post('/', VALIDATION, async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const article: Article = {
    title: req.body.title,
    content: req.body.content
  }

  const articleService = await ArticleService()
  const insertOneResult = await articleService.create(article)
  res.status(201).json(insertOneResult)
})

// // Update
// router.put('/:id', VALIDATION, (req: Request, res: Response) => {
//   const errors = validationResult(req)
//
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
//
//   const paramsId = parseInt(req.params.id, 10)
//   const index = articles.findIndex((a) => a.id === paramsId)
//
//   if (index !== -1) {
//     articles[index] = {
//       id: paramsId,
//       title: req.body.title,
//       content: req.body.content
//     }
//     res.json(articles[index])
//   } else {
//     res.status(404).json({ message: 'Article not found' })
//   }
// })
//
// // Delete
// router.delete('/:id', (req: Request, res: Response) => {
//   const paramsId = parseInt(req.params.id, 10)
//   const index = articles.findIndex((a) => a.id === paramsId)
//
//   if (index !== -1) {
//     articles.splice(index, 1)
//     res.status(204).end()
//   } else {
//     res.status(404).json({ message: 'Article not found' })
//   }
// })

export default router
