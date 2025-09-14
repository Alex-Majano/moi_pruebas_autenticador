import {createApp} from 'vue'
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from './router';
import App from './App.vue'

import '@/assets/styles/main.css'
import Ripple from 'primevue/ripple';
import regComponents from "@/plugins/loadComponents";
import {definePreset} from "@primeuix/themes";


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '',
      100: 'rgba(244,247,253)',
      200: '',
      300: '',
      400: '#2D52A8',
      500: '#2D52A8',
      600: '#2D52A8',
      700: '#3862c4',
      800: '#3862c499',
      900: '#2D52A899',
    },
  },
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: 'none',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
})

app.directive('ripple', Ripple);

regComponents(app).then(() => {
  app.mount('#app');
});
