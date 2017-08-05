import '../config'
import App from './src/app'
import {seed} from '../test/seed'

const app = new App()

app.connectDatabase()
  .then(() => {
    return app.run()
  })
  .then(() => {
    console.log(`The server is start at http://${app.SERVER_HOST}:${app.SERVER_PORT}!`)
  })
  .then(async () => {
    if(process.env.NODE_ENV === 'development') {
      await seed()
    }
  })
  .catch((error) => {
    console.error(error)
  })