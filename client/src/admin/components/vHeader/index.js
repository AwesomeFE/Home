import './style.scss'
import services from '../../services'
import template from './template.html'
import Component from 'vue-class-component'

@Component({
  template
})
class Header {
  mounted() {
  }

  logout() {
    services.staff.logout()
      .then(() => {
        this.$router.push('/signin')
      })
  }
}

export default Header