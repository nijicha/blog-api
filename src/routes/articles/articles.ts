import { Router, type Request, type Response } from 'express'
import { validationResult, type Result, type ValidationError } from 'express-validator'
import articlesValidator from './articles.validator'
import type { Article } from './types'

const router = Router()
const articles: Article[] = []

// Index
router.get('/', (req: Request, res: Response) => {
  res.json(articles)
})

// Show
router.get('/:id', (req: Request, res: Response) => {
  const paramsId = parseInt(req.params.id, 10)
  const article = articles.find((a) => a.id === paramsId)

  if (article) {
    res.json(article)
  } else {
    res.status(404).json({ message: 'Article not found' })
  }
})

// Create
router.post('/', articlesValidator, (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const article: Article = {
    id: articles.length + 1,
    title: req.body.title,
    content: req.body.content
  }

  articles.push(article)
  res.status(201).json(article)
})

// Update
router.put('/:id', articlesValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const paramsId = parseInt(req.params.id, 10)
  const index = articles.findIndex((a) => a.id === paramsId)

  if (index !== -1) {
    articles[index] = {
      id: paramsId,
      title: req.body.title,
      content: req.body.content
    }
    res.json(articles[index])
  } else {
    res.status(404).json({ message: 'Article not found' })
  }
})

// Delete
router.delete('/:id', (req: Request, res: Response) => {
  const paramsId = parseInt(req.params.id, 10)
  const index = articles.findIndex((a) => a.id === paramsId)

  if (index !== -1) {
    articles.splice(index, 1)
    res.status(204).end()
  } else {
    res.status(404).json({ message: 'Article not found' })
  }
})

export default router
