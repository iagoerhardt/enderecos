import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = "http://enderecos.local"; // URL da API

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios;
  }
})