import './style.scss'
import configs from './configs'
import template from './template.html'
import Component from 'vue-class-component'

@Component({
  template
})
class Sidebar {

  menus = configs()
  currentPath = '/'
  openMenu = ''

  mounted() {
    this.currentPath = this.$router.history.current.path
  }

  checkRouter() {
    this.currentPath = this.$router.history.current.path
  }

  toggleMenu(path) {
    if(this.openMenu == path) {
      this.openMenu = null
    } else {
      this.openMenu = path
    }
  }
}

export default Sidebar