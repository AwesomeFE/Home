import '../config'
import App from './src/app'

const app = new App()

app.connectDatabase()
  .then(() => {
    return app.run()
  })
  .then(() => {
    console.log(`The server is start at http://${app.SERVER_HOST}:${app.SERVER_PORT}!`)
  })
  .catch((error) => {
    console.error(error)
  })