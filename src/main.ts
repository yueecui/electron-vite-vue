import { createApp, nextTick } from 'vue';
import App from './App.vue';
import { router, setupRouter } from './routers';
import { setupStore } from './stores';
import './style/common.less';

(async () => {
    const app = createApp(App);
    setupStore(app);

    await setupRouter(app);
    await router!.isReady();

    app.mount('#app');
    nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*');
    });
})();
