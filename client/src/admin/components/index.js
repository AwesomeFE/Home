import Vue from 'vue';
import vImage from './vImage';
import vInput from './vInput';
import vLoading from './vLoading';

const components = {
  vImage,
  vInput,
  vLoading
};

export default () => {
  const componentList = Object.entries(components);

  for(const [name, component] of componentList) {
    Vue.component(name, component);
  }
}