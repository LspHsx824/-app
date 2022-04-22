import Vue from 'vue'
import vuex from 'vuex'

import {setItem,getItem} from '../utils/storage'

Vue.use(vuex)

const TOKEN_KEY = 'TOKEN_KEY'

const store =  new vuex.Store({
  state: {
    user:getItem(TOKEN_KEY),
    curComment:null,
    cachePages:[]
  },
  mutations: {
    setUser(state,data){

      state.user = data
      setItem(TOKEN_KEY,data)
    },
    setCurment(state,data){
      // console.log(data);
      state.curComment = data
    },
    addCachePage(state,pageName){
      if(!state.cachePages.includes(pageName)){
          state.cachePages.push(pageName)
      }
    },
    clearCachePage(state,pageName){
      state.cachePages = state.cachePages.filter( page=> page !== pageName)
    }
  },
  actions: {
  },
  
})

export default store
