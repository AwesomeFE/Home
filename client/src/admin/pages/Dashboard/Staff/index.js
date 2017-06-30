import './style.scss'
import template from './template.html'
import Component from 'vue-class-component'

@Component({
  template
})
class Staff {
  tableConfigs = {
    columns: [
      {key: 'avatar', text: '头像', sortable: true},
      {key: 'name', text: '名字', sortable: true},
      {key: 'email', text: '邮箱', sortable: true},
      {key: 'isOnline', text: '在线状态', sortable: true}
    ],
    actions: [
    ]
  }

  mounted() {
  }
}

export default Staff