<template>
  <div class="CountryForm Wrapper">
    <h1 class="Header">
      {{$t('CountryForm')}}
      <v-button
        className="CountryForm_submit btn btn-primary btn-flat"
        @click="submit"
        :disabled="disabled"
      >
        {{$t('submit')}}
      </v-button>
    </h1>

    <v-content-box
      :title="$t('BasicForm')"
      :message="remoteMessage"
    >
      <v-input
        type="text"
        name="desc"
        validate="required"
        v-model="formData.desc"
        :label="$t('label_desc')"
        :placeholder="$t('placeholder_desc')"
        :disabled="disabled"
      />
      <v-input
        type="text"
        name="code"
        validate="required"
        v-model="formData.code"
        :label="$t('label_code')"
        :placeholder="$t('placeholder_code')"
        :disabled="disabled"
      />
    </v-content-box>

    <v-content-box
      :title="$t('i18nForm')"
    >
      <div v-for="name in formData.names" :key="name.id">
        <v-input
          type="text"
          v-model="name.lang"
          :name="name._id"
          :label="$t('label_lang')"
          :disabled="disabled"
        />
        <v-input
          type="text"
          v-model="name.title"
          :name="name._id"
          :label="$t('label_title')"
          :placeholder="$t('placeholder_title')"
          :disabled="disabled"
        />
      </div>
    </v-content-box>
  </div>
</template>

<script>
import uuid from 'node-uuid';
import {Vue, Component} from 'vue-property-decorator';

@Component()
class CountryForm extends Vue {
  formData = {
    desc: null,
    code: null,
    names: [{
      _id: uuid.v4(),
      lang: null,
      title: null
    }]
  };
  remoteMessage = '';
  disabled = false;

  get isEdit() {
    return !!this.$route.params.countryId;
  }

  async mounted() {
    if(this.isEdit) {
      const { countryId } = this.$route.params;
      const { data } = await this.$store.dispatch('country/getCountryDetal', countryId);

      for(const key in this.formData) {
        this.formData[key] = data[key];
      }
    }
  }

  async submit() {
    this.disabled = true;

    try {
      const isValid = await this.$validator.validateAll();
      const { countryId } = this.$route.params;
      const { formData } = this;

      if(isValid) {
        const res = this.isEdit
          ? await this.$store.dispatch('country/editCountry', { countryId, formData })
          : await this.$store.dispatch('country/createCountry', this.formData);

        this.$router.push('/country');
      }
    } catch(message) {
      this.remoteMessage = message.type;
    }

    this.disabled = false;
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
  label_desc: "国家标识符"
  placeholder_desc: "如：中国 - zh-cn"
  label_code: "国家区号"
  placeholder_code: "如：中国 - 0086"
  label_lang: "国家语言标识符"
  label_title: "国家名称"
  placeholder_title: "如：中国"
</i18n>