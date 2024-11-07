import { reactive as r } from "vue";
import { createStore as s } from "vuex";
const e = r({
  modules: {}
}), n = (o, t) => {
  e.modules[o] = t;
}, c = () => e.modules, d = () => s(e);
export {
  c as getStoreModules,
  d as getVuexStore,
  n as setStoreModule
};
