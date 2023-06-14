import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      favorites: [],
      count: 0
    }
  },
  mutations: {
    addToFavorites(state, payload) {
      state.count++
      state.favorites.push(payload)
    },
    deleteFromFavorites(state, payload) {
      state.count--
      state.favorites = state.favorites.filter((v) => v != payload)
    }
  }
})

export default store
