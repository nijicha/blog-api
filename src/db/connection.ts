import { MongoClient, type Db } from 'mongodb'

async function connection() {
  const uri: string = process.env.MONGODB_URI || ''
  const client: MongoClient = new MongoClient(uri)

  return {
    connect: async (): Promise<Db> => {
      try {
        await client.connect()
        return client.db(process.env.DATABASE_NAME)
      } catch (error) {
        throw new Error(`Error connecting to the database: ${error}`)
      }
    },
    disconnect: async (): Promise<void> => {
      try {
        await client.close()
      } catch (error) {
        throw new Error(`Error disconnecting from the database: ${error}`)
      }
    }
  }
}

export default connection
