/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
//import iView from '../src/index';
// import locale from '../src/locale/lang/en-US';
//import locale from '../src/locale/lang/zh-CN';

Vue.use(VueRouter);
// Vue.use( { locale });

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    routes: [
        
        {
            path: '/date',
            component: require('./routers/date.vue')
        },
       
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
