import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCreditCard, faHashtag, faGift, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faCcPaypal, faLinkedin, faInstagramSquare, faYoutubeSquare, faTwitterSquare, faFlickr} from '@fortawesome/free-brands-svg-icons';

library.add(faCreditCard, faCcPaypal, faLinkedin, faInstagramSquare, faYoutubeSquare, faTwitterSquare, faFlickr, faHashtag, faGift, faInfoCircle);

// register components
Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('nation-map', require('./components/NationMap.vue').default);
Vue.component('cases-list', require('./components/CasesList.vue').default);
Vue.component('cases-summary', require('./components/CasesSummary.vue').default);
Vue.component('region-info', require('./components/RegionInfo.vue').default);

Vue.use(ElementUI);
Vue.prototype.$loading = Loading.service;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
