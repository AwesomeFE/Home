import Vue from 'vue'
import swiper from './swiper'

const directives = {
  swiper,
}

export default () => {
  const directiveList = Object.entries(directives)

  for(const [name, directive] of directiveList) {
    Vue.directive(name, directive)
  }
}