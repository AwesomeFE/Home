import './style.scss'
import template from './template.html'
import Component from 'vue-class-component'

@Component({
  template
})
class Staff {
  tableConfigs = {
    columns: [
      {key: 'name', text: 'Name'}
    ]
  }
  mounted() {
  }
}

export default Staff