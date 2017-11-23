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
      <v-table
        :i18n="countries.i18n"
        :headers="countries.headers"
        :data="countries.data"
        :total="0"
      />
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
  isLoading = true;

  get countries() {
    const headers = ['name', 'desc', 'code'];

    const data = this.$store.state.country.countryArray.map(country => {
      const local = country.names.find(nameItem => nameItem.lang === 'zh-cn');
      country.name = local ? local.title : country.desc;
      return country;
    });

    return { data, headers };
  }

  async mounted() {
    this.isLoading = true;
    await this.$store.dispatch('country/getCountryList');
    this.isLoading = false;
  }

  setCountryTable() {

  }
}

export default Country;
</script>

<style type="text/scss" lang="scss">
.Country {
  
}
</style>
<i18n>
zh-cn:
  Country: "国家"
  Country_desc: "查看/设置国家地区列表"
  CountryList: "国家列表"
  ProvinceList: "自治区列表"
  CityList: "城市列表"
</i18n>