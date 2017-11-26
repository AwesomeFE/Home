<template>
  <div class="CountryForm Wrapper">
    <h1 class="Header">
      {{$t('CountryForm')}}
      <v-button
        className="CountryForm_submit btn btn-primary btn-flat"
        @click="submit"
      >
        {{$t('submit')}}
      </v-button>
    </h1>

    <v-content-box
      :title="$t('BasicForm')"
    >
    </v-content-box>

    <v-content-box
      :title="$t('i18nForm')"
    >
    </v-content-box>
  </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator';

@Component()
class CountryForm extends Vue {
  async mounted() {
    const { countryId } = this.$route.params;

    if(countryId) {
      const { data } = await this.$store.dispatch('country/getCountryDetal', countryId);
    }
  }

  submit() {
  }
}

export default CountryForm;
</script>

<style type="text/scss" lang="scss">
.CountryForm {
  .CountryForm_submit {
    float: right;
  }
}
</style>
<i18n>
zh-cn:
  CountryForm: "编辑国家"
  BasicForm: "基本信息"
  i18nForm: "翻译信息"
  submit: "提交"
</i18n>