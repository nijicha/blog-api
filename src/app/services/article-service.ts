import connection from '@/db/connection'
import { Collection, Db, InsertOneResult, WithId } from 'mongodb'
import type { Article } from '@/app/models/article'

export default async function ArticleService() {
  const collectionName = 'articles'
  const conn = await connection()
  let collection: Collection<Article>

  return {
    list: async (): Promise<WithId<Article>[]> => {
      let articles: WithId<Article>[] = []

      try {
        const db: Db = await conn.connect()

        collection = db.collection<Article>(collectionName)
        articles = await collection.find().toArray()
        return articles
      } finally {
        await conn.disconnect()
      }
    },
    create: async (article: Article): Promise<InsertOneResult<Article>> => {
      try {
        const db: Db = await conn.connect()

        collection = db.collection<Article>(collectionName)
        return await collection.insertOne(article)
      } finally {
        await conn.disconnect()
      }
    }
  }
}
