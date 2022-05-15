import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App';
import Antd,{message} from 'ant-design-vue';
import { API } from "./config/api";
import 'ant-design-vue/dist/antd.css';
const app = createApp(App)
app.config.globalProperties.$message = message;
app.config.globalProperties.$api = API;

app.use(store).use(router).use(Antd).mount('#app')
