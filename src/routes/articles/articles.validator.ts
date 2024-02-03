import { body, type ValidationChain } from 'express-validator'

const articlesValidator: ValidationChain[] = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required')
]

export default articlesValidator
