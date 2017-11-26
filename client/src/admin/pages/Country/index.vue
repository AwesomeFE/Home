<template>
  <div class="Country Wrapper">
    <h1 class="Header">
      {{$t('Country')}}
      <small class="Header__description">
        {{$t('Country_desc')}}
      </small>

      <v-button
        className="Country_create btn btn-primary btn-flat"
        to="/country/create"
      >创建</v-button>
    </h1>

    <v-content-box
      :title="$t('CountryList')"
    >
      <v-table
        :headers="countryHeaders"
        :data="countryData"
        :actions="countryActions"
        :total="0"
        @edit="editCountry"
        @publish="publishCountry"
        @delete="deleteCountry"
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

  countryHeaders = [
    {key: 'name', title: '名称'},
    {key: 'desc', title: '简称'},
    {key: 'code', title: '编号'}
  ];

  countryActions = [
    {name: 'edit', iconName: 'fa fa-pencil', className: 'btn btn-primary btn-flat'},
    {name: 'publish', iconName: 'fa fa-cloud-upload', className: 'btn btn-primary btn-flat'},
    {name: 'unpublish', iconName: 'fa fa-cloud-download', className: 'btn btn-primary btn-flat'},
    {name: 'delete', iconName: 'fa fa-trash-o', className: 'btn btn-primary btn-flat'}
  ];

  get countryData() {
    const countryArray = this.$store.state.country.countryArray;

    return countryArray.map(country => {
      const local = country.names.find(
        nameItem => nameItem.lang === 'zh-cn'
      );

      country.name = local ? local.title : country.desc;
      return country;
    });
  }

  async mounted() {
    this.isLoading = true;
    await this.$store.dispatch('country/getCountryList');
    this.isLoading = false;
  }

  editCountry(event, country) {
    this.$router.push(`/country/${country._id}`)
  }

  publishCountry(event, country) {
    console.log(event, country);
  }

  deleteCountry(event, country) {
    console.log(event, country);
  }
}

export default Country;
</script>

<style type="text/scss" lang="scss">
.Country {
  .Country_create {
    float: right;
  }
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