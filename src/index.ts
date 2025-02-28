import {LktObject} from "lkt-vue-kernel";
import {reactive, UnwrapNestedRefs} from "vue";
//@ts-ignore
import {createStore} from "vuex";

const LktVuexConfig: UnwrapNestedRefs<LktObject> = reactive({
    modules: {}
});

export const setStoreModule = (module: string, config: LktObject) => {
    LktVuexConfig.modules[module] = config;
}

export const getStoreModules = () => {
    return LktVuexConfig.modules;
}

export const getVuexStore = () => {
    return createStore(LktVuexConfig);
}