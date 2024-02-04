import MongoDbAdapter from '@/db/adapters/mongodb-adapter'
import type { Db } from 'mongodb'

export default class DatabaseConnection {
  private connection: MongoDbAdapter

  constructor() {
    this.connection = new MongoDbAdapter()
  }

  public async run(childFn: (db: Db) => unknown): Promise<void> {
    let db: Db | undefined = undefined

    try {
      db = await this.connection.connect()
      await childFn(db)
    } finally {
      if (db) {
        await this.connection.disconnect()
      }
    }
  }
}
