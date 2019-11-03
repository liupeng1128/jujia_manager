// eslint-disable-next-line no-unused-vars
import { get} from '../http/axios'
import moment from 'moment'
export default {
  namespaced: true,
  state: {
    // visible: false,
    orders: [],
    title: '添加订单信息',
  },
  getters: {
    countOrders: (state) => {
      return state.orders.length
    },
    // 需要为获取器传递参数的写法
    filterOrdersByStatus(state){
      return (status)=>{
        return state.orders.filter((item)=>{
          return item.status === status;
        })
      }
    }
  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    // 需要接受一个参数，这个参数就是orders
    refreshOrders(state, orders) {
      state.orders = orders;
    },
    setTitle(state, title) {
      state.title = title;
    },
  },
  actions: {
    //派单
    async sendOrder({commit,dispatch }, params){
      let response = await get('/order/sendOrder?waiterId='+params.waiterId+"&orderId="+params.orderId);
    dispatch("findAllOrders")
      return response;
    },
      // 取消派单
      async cancelSendOrder({commit,dispatch},orderId) {
        let response = await get("/order/cancelSendOrder", { orderId });
        dispatch("findAllOrders");
        return response;
      },
    //查询所有的订单
    async findAllOrders(context) {
      let response = await get("/order/findAll");
      // 1. 查询所有订单信息
      response.data.forEach((item)=>{
        item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
      })
      // 2. 将订单信息设置到state.orders中
      context.commit('refreshOrders', response.data)
    },

  }
}
