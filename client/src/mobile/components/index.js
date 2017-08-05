import Vue from 'vue'
import PageNav from './PageNav/PageNav.vue'
import chatting from './vChatting/chatting.vue'
import TopHeader from './TopHeader/TopHeader.vue'
import vImage from './vImage/vImage.vue'
import BlogCard from './BlogCard/BlogCard.vue'

const components = {
  PageNav,
  TopHeader,
  chatting,
  vImage,
  BlogCard
}

export default () => {
  const componentList = Object.entries(components)

  for(const [name, component] of componentList) {
    Vue.component(name, component)
  }
}