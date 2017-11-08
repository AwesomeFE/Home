import Vue from 'vue';
import vImage from './vImage';
import vLoading from './vLoading';

const components = {
  vImage,
  vLoading
};

export default () => {
  const componentList = Object.entries(components);

  for(const [name, component] of componentList) {
    Vue.component(name, component);
  }
}