import { Module } from 'vuex'

const selectedSide = localStorage.getItem('side') === 'dark' ? 'dark' : 'light'

interface SideState {
  side: 'dark' | 'light'
}

export const sideModule: Module<SideState, any> = {
  state: (): SideState => ({
    side: selectedSide,
  }),

  getters: {
    getIsDarkSide: (state: SideState) => state.side === 'dark',
  },

  mutations: {
    CHANGE_SIDE(state: SideState, payload: SideState['side']) {
      state.side = payload
    },
  },
  actions: {
    changeSide({ commit }, side: SideState['side']) {
      localStorage.setItem('side', side)
      commit('CHANGE_SIDE', side)
    },
  },
}
