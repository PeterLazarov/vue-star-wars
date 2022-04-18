import { createStore } from 'vuex'
import { sideModule } from './modules/side'

const store = createStore({
  modules: {
    side: sideModule,
  },
})

export default store
