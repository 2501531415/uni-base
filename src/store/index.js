import * as Pinia from 'pinia';

export const store = Pinia.createPinia()

export default function setupPinia(app){
  app.use(store)
  return Pinia
}