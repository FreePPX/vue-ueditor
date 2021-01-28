//index.js
import VueUEditor from './VueUEditor.vue';

export default {
  install: Vue => {
    Vue.component(VueUEditor.name, VueUEditor)
  },
  VueUEditor
}