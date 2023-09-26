import { getMyOrderList } from '@/api/order'

export default {
  namespaced: true,
  state () {
    return {
      orderList: []
    }
  },
  mutations: {
    // 把获取的订单数据存入Vuex
    setMyorderList (state, newList) {
      state.orderList = newList
    }
  },
  actions: {
    // 获取订单数据
    async getMyOrderAction (context) {
      const { data } = await getMyOrderList()
      context.commit('setMyorderList', data.list)
    }
  },
  getters: {

  }
}
