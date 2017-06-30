import Vue from 'vue'
import template from './template.html'
import Component from 'vue-class-component'

const props = [
  'columns'
]

@Component({
  template,
  props
})
class DataTable {

}

export default DataTable