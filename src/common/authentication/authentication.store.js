import { store } from '@app/app.store'

const LOGIN_USER = '[authentication] LOGIN_USER'
const LOGOUT_USER = '[authentication] LOGOUT_USER'

store.registerModule('authentication', {
  state: {
    user: null,
    isAuthenticated: false
  },
  mutations: {
    [LOGIN_USER](state, user) {
      state.isAuthenticated = true
      state.user = user
    },
    [LOGOUT_USER](state) {
      state.isAuthenticated = false
      state.user = null
    }
  },
})

export const authenticationMutations = {
  login: username => store.commit(LOGIN_USER, username),
  logout: () => store.commit(LOGOUT_USER)
} 
