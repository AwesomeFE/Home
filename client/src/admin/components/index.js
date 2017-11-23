import Vue from 'vue';
import vLogo from './vLogo';
import vImage from './vImage';
import vInput from './vInput';
import vTable from './vTable';
import vButton from './vButton';
import vHeader from './vHeader';
import vLoading from './vLoading';
import vNavMenu from './vNavMenu';
import vProfile from './vProfile';
import vSidebar from './vSidebar';
import vSideMenu from './vSideMenu';
import vCheckbox from './vCheckbox';
import vContentBox from './vContentBox';

const components = {
  vLogo,
  vImage,
  vInput,
  vTable,
  vButton,
  vHeader,
  vLoading,
  vNavMenu,
  vProfile,
  vSidebar,
  vSideMenu,
  vCheckbox,
  vContentBox
};

export default () => {
  const componentList = Object.entries(components);

  for(const [name, component] of componentList) {
    Vue.component(name, component);
  }
}