import Vue from 'vue'
import vuex from 'vuex'

import {setItem,getItem} from '../utils/storage'

Vue.use(vuex)

const TOKEN_KEY = 'TOKEN_KEY'

export default new vuex.Store({
  state: {
    user:getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state,data){

      state.user = data
      setItem(TOKEN_KEY,data)
    }
  },
  actions: {
  },
  
})
