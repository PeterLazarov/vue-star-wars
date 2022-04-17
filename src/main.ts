import { createApp } from 'vue'
import { QueryClient, VUE_QUERY_CLIENT } from 'vue-query'
import App from './App.vue'
import router from './router'
import store from './store'

const queryClient = new QueryClient()
queryClient.mount()

createApp(App)
  .provide(VUE_QUERY_CLIENT, queryClient)
  .use(store)
  .use(router)
  .mount('#app')
