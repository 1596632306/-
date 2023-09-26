import { getInfor, setInfor, removeInfor } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      //
      userInfo: getInfor()

    }
  },
  mutations: {

    setUserInfo (state, obj) {
      state.userInfo = obj
      // console.log(obj)
      setInfor(obj)
    }

  },
  actions: {
    // 重置vuex里面的数据
    logout (context) {
      context.commit('setUserInfo', {})
      // 退出登录
      removeInfor()
      // 跨模块调用mutations
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
