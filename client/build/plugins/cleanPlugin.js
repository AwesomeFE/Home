import path from 'path'
import CleanPlugin from 'clean-webpack-plugin'

export default () => [
  new CleanPlugin(['dist'], {
    root: path.join(__dirname, '../../'),
    verbose: true,
    dry: false,
    // watch: true
  })
]