import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import lang from "element-plus/lib/locale/lang/ru";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { lang });
app.mount("#app");
