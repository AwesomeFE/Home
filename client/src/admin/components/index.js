import Vue from 'vue';
import vLogo from './vLogo';
import vImage from './vImage';
import vInput from './vInput';
import vButton from './vButton';
import vHeader from './vHeader';
import vLoading from './vLoading';
import vNavMenu from './vNavMenu';
import vSidebar from './vSidebar';
import vCheckbox from './vCheckbox';

const components = {
  vLogo,
  vImage,
  vInput,
  vButton,
  vHeader,
  vLoading,
  vNavMenu,
  vSidebar,
  vCheckbox
};

export default () => {
  const componentList = Object.entries(components);

  for(const [name, component] of componentList) {
    Vue.component(name, component);
  }
}