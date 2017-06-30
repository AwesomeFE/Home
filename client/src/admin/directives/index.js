import Vue from 'vue'

const directives = {
}

export default () => {
  Object.entries(directives).forEach(([name, directive]) => Vue.directive(name, directive))
}