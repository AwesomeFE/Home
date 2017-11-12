import Vue from 'vue';
import vImage from './vImage';
import vInput from './vInput';
import vButton from './vButton';
import vHeader from './vHeader';
import vLoading from './vLoading';
import vCheckbox from './vCheckbox';

const components = {
  vImage,
  vInput,
  vButton,
  vHeader,
  vLoading,
  vCheckbox
};

export default () => {
  const componentList = Object.entries(components);

  for(const [name, component] of componentList) {
    Vue.component(name, component);
  }
}