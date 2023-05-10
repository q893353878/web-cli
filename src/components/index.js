import Vue from 'vue';

const header = r => require.ensure([], () => r(require('./Header.vue')), 'header');
const aside = r => require.ensure([], () => r(require('./Aside.vue')), 'aside');

Vue.component('self-header', header);
Vue.component('self-aside', aside);
