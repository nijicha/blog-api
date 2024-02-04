import {
  ObjectId,
  type Collection,
  type DeleteResult,
  type InsertOneResult,
  type UpdateResult,
  type WithId
} from 'mongodb'
import type { Article } from '@/app/models/article'
import DatabaseConnection from '@/db/connection'

export default function ArticleService() {
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
    where: async (filters: Partial<Article>): Promise<WithId<Article>[]> => {
      let articles: WithId<Article>[] = []

      await connection.run(async (db) => {
        collection = db.collection<Article>(collectionName)
        articles = await collection.find(filters).toArray()
      })

      return articles
    },
    find: async (id: string): Promise<WithId<Article> | null> => {
      let article: WithId<Article> | null = null

      await connection.run(async (db) => {
        collection = db.collection<Article>(collectionName)
        article = await collection.findOne<WithId<Article>>({ _id: new ObjectId(id) })
      })

      return article
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
    },
    update: async (id: string, article: Article): Promise<UpdateResult<Article>> => {
      // Mocking the result type-safe
      let result: UpdateResult<Article> = {
        acknowledged: false,
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: new ObjectId()
      }

      await connection.run(async (db) => {
        collection = db.collection<Article>(collectionName)
        result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: article })
      })

      return result
    },
    delete: async (id: string): Promise<DeleteResult> => {
      // Mocking the result type-safe
      let result: DeleteResult = {
        acknowledged: false,
        deletedCount: 0
      }

      await connection.run(async (db) => {
        collection = db.collection<Article>(collectionName)
        result = await collection.deleteOne({ _id: new ObjectId(id) })
      })

      return result
    }
  }
}
