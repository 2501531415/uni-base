import { createSSRApp } from "vue";
import setupI18n from '@/utils/locale.js'
import setupPinia from '@/store/index.js'
 
import uviewPlus from 'uview-plus'
import App from "./App.vue";

export function createApp() {
	const app = createSSRApp(App);
  
  app.use(uviewPlus)
  
  setupI18n(app)
  
  const Pinia = setupPinia(app)
  
	return {
		app,
    Pinia
	};
}
