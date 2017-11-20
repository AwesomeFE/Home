<template>
  <div class="Country Wrapper">
    <h1 class="Header">
      {{$t('Country')}}
      <small class="Header__description">
        {{$t('Country_desc')}}
      </small>
    </h1>

    <v-content-box
      :title="$t('CountryList')"
    >
    </v-content-box>

    <v-content-box
      :title="$t('ProvinceList')"
    >
    </v-content-box>

    <v-content-box
      :title="$t('CityList')"
    >
    </v-content-box>
  </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator';

@Component()
class Country extends Vue {

}

export default Country;
</script>

<style type="text/scss" lang="scss">
.Country {
  
}
</style>
<i18n>
zh:
  Country: "国家"
  Country_desc: "查看/设置国家地区列表"
  CountryList: "国家列表"
  ProvinceList: "自治区列表"
  CityList: "城市列表"
</i18n>