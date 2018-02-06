import Vue from 'vue';
import vImage from './vImage';
import vButton from './vButton';
import vLoading from './vLoading';
import BlogCard from './BlogCard';
import TopHeader from './TopHeader';

const components = {
  vImage,
  vButton,
  vLoading,
  TopHeader,
  BlogCard
}

export default () => {
  const componentList = Object.entries(components)

  for(const [name, component] of componentList) {
    Vue.component(name, component)
  }
}