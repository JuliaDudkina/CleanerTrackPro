import { createApp } from 'vue'
import App from './App.vue'
import router from  './router';
import store from "./store";
import Wrapper from './components/UI/Wrapper';
import LinkButton from "./components/UI/LinkButton";

const app = createApp(App);
app.use(router);
app.use(store);
app.component('wrapper', Wrapper);
app.component('link-button', LinkButton);

app.mount('#app');
