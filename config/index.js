const envImport = () => {
  const env = require('dotenv')
  const path = require('path')

  const {NODE_ENV} = process.env

  env.config({path: path.join(__dirname, `./${NODE_ENV}.env`)})
}

export default envImport()