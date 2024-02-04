import { MongoClient, type Db } from 'mongodb'

export default class DatabaseConnection {
  private readonly url: string
  private client: MongoClient

  constructor() {
    this.url = process.env.MONGODB_URI || ''
    this.client = new MongoClient(this.url)
  }

  public async connect(): Promise<Db> {
    try {
      await this.client.connect()
      return this.client.db(process.env.DATABASE_NAME)
    } catch (error) {
      throw new Error(`Error connecting to the database: ${error}`)
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.client.close()
    } catch (error) {
      throw new Error(`Error disconnecting from the database: ${error}`)
    }
  }
}
