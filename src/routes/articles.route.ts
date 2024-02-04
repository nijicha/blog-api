import { Router, type Request, type Response } from 'express'
import {
  body,
  validationResult,
  type Result,
  type ValidationError,
  type ValidationChain
} from 'express-validator'
import type { DeleteResult, InsertOneResult, UpdateResult, WithId } from 'mongodb'
import type { Article } from '@/app/models/article'
import ArticleService from '@/app/services/article-service'

// TODO: Change this file structure to class or module. This cannot be tested.

const router: Router = Router()
const VALIDATION: ValidationChain[] = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required')
]
const articleService = ArticleService()

// Index
router.get('/', async (_req: Request, res: Response) => {
  const articles: WithId<Article>[] = await articleService.list()
  res.json(articles)
})

// Show
router.get('/:id', async (req: Request, res: Response) => {
  const article: WithId<Article> | null = await articleService.find(req.params.id)

  if (article) {
    res.json(article)
  } else {
    res.status(404).json({ message: 'Article not found' })
  }
})

// Create
router.post('/', VALIDATION, async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  const article: Article = {
    title: req.body.title,
    content: req.body.content
  }

  const result: InsertOneResult<Article> = await articleService.create(article)

  if (result.acknowledged) {
    res.status(201).json(result)
  } else {
    res.status(500).json({ message: 'Failed to create article' })
  }
})

// Update
router.put('/:id', VALIDATION, async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const result: UpdateResult<Article> = await articleService.update(req.params.id, req.body)

  if (result.acknowledged) {
    res.json(result)
  } else {
    res.status(500).json({ message: 'Failed to update article' })
  }
})

// // Delete
router.delete('/:id', async (req: Request, res: Response) => {
  const result: DeleteResult = await articleService.delete(req.params.id)

  if (result.acknowledged) {
    res.json(result)
  } else {
    res.status(500).json({ message: 'Failed to delete article' })
  }
})

export default router
