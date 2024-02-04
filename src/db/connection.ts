import MongoDbAdapter from '@/db/adapters/mongodb-adapter'

export default class DatabaseConnection {
  private connection: MongoDbAdapter

  constructor() {
    this.connection = new MongoDbAdapter()
  }

  public async run(childFn: () => unknown): Promise<void> {
    await this.connection.connect()
    await childFn()
    await this.connection.disconnect()
  }
}
