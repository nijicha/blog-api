import { MongoClient, type Db } from 'mongodb'

async function connection(): Promise<Db> {
  const connectionString = process.env.MONGODB_URI || ''
  const client = new MongoClient(connectionString)

  try {
    await client.connect()
    return client.db(process.env.DATABASE_NAME)
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error}`)
  } finally {
    await client.close()
  }
}

export default connection
