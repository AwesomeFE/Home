import mongoose from 'mongoose'

mongoose.Promise = global.Promise

class DatabaseService {
  constructor() {
    this.connection = mongoose.connection

    this.DB_HOST = process.env.DB_HOST
    this.DB_PORT = process.env.DB_PORT
    this.DB_NAME = process.env.DB_NAME
    this.DB_USERNAME = process.env.DB_USERNAME
    this.DB_PASSWORD = process.env.DB_PASSWORD
  }

  connect() {
    mongoose.connect(`mongodb://${this.DB_HOST}:${this.DB_PORT}/${this.DB_NAME}`, {
      user: this.DB_USERNAME,
      pass: this.DB_PASSWORD
    })

    return new Promise((resolve) => {
      this.connection.once('open', () => {
        console.log(`Connect database mongodb://${this.DB_HOST}:${this.DB_PORT}/${this.DB_NAME} successfully!`)
        resolve()
      })
    })
  }
}

export default new DatabaseService()