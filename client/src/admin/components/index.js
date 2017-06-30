import Vue from 'vue'
import vHeader from './vHeader'
import vSidebar from './vSidebar'
import vChatting from './vChatting'
import vDataTable from './vDataTable'

const components = {
  vHeader,
  vSidebar,
  vChatting,
  vDataTable
}

export default () => {
  Object.entries(components).forEach(([name, component]) => Vue.component(name, component))
}