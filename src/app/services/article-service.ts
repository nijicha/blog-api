import { Collection, InsertOneResult, ObjectId, WithId } from 'mongodb'
import type { Article } from '@/app/models/article'
import DatabaseConnection from '@/db/connection'

export default async function ArticleService() {
  const connection = new DatabaseConnection()
  const collectionName = 'articles'
  let collection: Collection<Article>

  return {
    list: async (): Promise<WithId<Article>[]> => {
      let articles: WithId<Article>[] = []

      await connection.run(async (db) => {
        collection = db.collection<Article>(collectionName)
        articles = await collection.find().toArray()
      })

      return articles
    },
    create: async (article: Article): Promise<InsertOneResult<Article>> => {
      // Mocking the result type-safe
      let result: InsertOneResult<Article> = {
        acknowledged: false,
        insertedId: new ObjectId()
      }

      await connection.run(async (db) => {
        collection = db.collection<Article>(collectionName)
        result = await collection.insertOne(article)
      })

      return result
    }
  }
}
