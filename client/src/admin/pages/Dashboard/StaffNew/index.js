import './style.scss'
import services from '../../../services'
import template from './template.html'
import Component from 'vue-class-component'

@Component({
  template
})
class StaffNew {
  username = null
  password = null
  mobile = null
  email = null
  avatar = null
  message = null

  static isPass = false
  static isFailed = true
  static isFieldEmpty = value => value === null || value === ''

  async createStaff() {
    try {
      if (this.checkFields() != StaffNew.isPass) return

      const {data:staff} = await services.staff.register(this.newStaff)
      this.$router.push('/dashboard/settings/staff')

    } catch (err) {
      const error = services.errorHandler(err)
      this.message = error.isRemoteError ? error.ErrorID : console.error(err)
    }
  }

  uploadAvatar(event) {
    this.avatar = event.target.files[0]
  }

  checkFields() {
    return this.checkField('username') +
      this.checkField('password') +
      this.checkField('mobile') +
      this.checkField('email')
  }

  checkField(fieldName) {
    if (StaffNew.isFieldEmpty(this[fieldName])) {
      this[fieldName] = ''
      return StaffNew.isFailed
    }
    return StaffNew.isPass
  }

  get newStaff() {
    const formData = new FormData()
    formData.append('username', this.username)
    formData.append('password', this.password)
    formData.append('mobile', this.mobile)
    formData.append('email', this.email)
    formData.append('avatar', this.avatar)
    return formData
  }

  get $validation() {
    return {
      usernameRequired: this.username === '',
      passwordRequired: this.password === '',
      mobileRequired: this.mobile === '',
      emailRequired: this.email === ''
    }
  }
}

export default StaffNew