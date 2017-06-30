import './style.scss'
import services from '../../services'
import template from './template.html'
import Component from 'vue-class-component'
import Ps from 'perfect-scrollbar'

@Component({
  template
})
class Dashboard {
  created() {
    this.ensureLogin()
  }

  mounted() {
    Ps.initialize(this.$el)
  }

  async ensureLogin() {
    const loginStaff = await services.staff.getLoginStaff()
    if(loginStaff) {
      this.$store.commit('setLoginStaff', loginStaff)
    } else {
      this.$router.push({path: '/signin'})
    }
  }
}

export default Dashboard