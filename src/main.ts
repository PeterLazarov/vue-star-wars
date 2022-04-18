import { createApp } from 'vue'
import { QueryClient, VUE_QUERY_CLIENT } from 'vue-query'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.variable.min.css'

import store from '@/store'

const queryClient = new QueryClient()
queryClient.mount()

createApp(App)
  .provide(VUE_QUERY_CLIENT, queryClient)
  .use(store)
  .use(router)
  .use(Antd)
  .mount('#app')
