<template>
  <div id="order">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--      所有订单-->
      <el-tab-pane label="所有订单" name="all">
        <el-table :data="orders" size="small">
          <el-table-column prop="id" label="订单编号" />
          <el-table-column prop="total" label="订单数量" />
          <el-table-column prop="orderTime" label="下单时间" />
          <el-table-column prop="status" label="订单状态" />
          <el-table-column prop="customerId" label="订单状态" />
          <el-table-column label="操作" width="100px" align="center">
            <template #default="record">
              <a href="" @click.prevent="toDetails(record.row)">详情</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--      所有订单-->
      <!--      所有订单-->
      <el-tab-pane label="待派单" name="待派单">
        <el-table  :data="filterOrdersByStatus(activeName)" size="small" @selection-change="idsChangeHandler">
          <el-table-column prop="id" label="订单编号" />
          <el-table-column prop="total" label="订单数量" />
          <el-table-column prop="orderTime" label="下单时间" />
          <el-table-column prop="status" label="订单状态" />
          <el-table-column label="操作" width="100px" align="center">
            <template v-slot="slot">
              <a href="" @click.prevent="paidanHandler(slot.row.id)">派单</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--      所有订单-->
      <el-tab-pane label="待接单" name="待接单">
        <el-table  :data="filterOrdersByStatus(activeName)" size="small" @selection-change="idsChangeHandler">
          <el-table-column prop="id" label="订单编号" />
          <el-table-column prop="total" label="订单数量" />
          <el-table-column prop="orderTime" label="下单时间" />
          <el-table-column prop="status" label="订单状态" />
          <el-table-column label="操作" width="100px" align="center">
            <template v-slot="slot">
              <a href="" @click.prevent="cancelHandler(slot.row.id)">取消</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="已完成">
        <el-table  :data="filterOrdersByStatus(activeName)" size="small" @selection-change="idsChangeHandler">
          <el-table-column prop="id" label="订单编号" />
          <el-table-column prop="total" label="订单数量" />
          <el-table-column prop="orderTime" label="下单时间" />
          <el-table-column prop="status" label="订单状态" />
          <el-table-column label="操作" width="100px" align="center">
            <template #default="record">
              <a href="" @click.prevent="toDetails(record.row)">详情</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
<!--   模态框-->

    <el-dialog title="请选择员工" :visible="visible"
      width="40%" :before-close="handleClose">
      <div class="dialog-content">
        <el-radio-group v-model="params.waiterId">
          <div v-for="w in waiters" :key="w.id" :value="w.id">
            <el-radio style="line-height:3em" :label="w.id" :key="w.id" :value="w.id">{{w.realname}}{{w.id}}</el-radio>
          </div>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="sendOrderHandler">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// eslint-disable-next-line no-unused-vars
//import order from '../../store/modules/order'
export default {
  data() {
    return {
      activeName:'all',
      params: {
        waiterId:0,
        orderId:0
      },
      visible:false
    }
  },
  created() {
    this.findAllOrders()
    this.findAllWaiters()

  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    // 状态
    ...mapState('order', ['orders', 'title']),
    ...mapState('waiter',['waiters']),
    ...mapGetters('order', ['countOrders', 'filterOrdersByStatus'])
    // 普通属性
  },
  methods: {
    // 动作
    ...mapActions('order', ['sendOrder','cancelSendOrder','findAllOrders', 'deleteOrderById', 'saveOrUpdateOrder', 'batchDeleteOrders']),
    // 突变
    ...mapMutations('order', ['showModal', 'closeModal', 'setTitle']),
    ...mapActions('waiter',['findAllWaiters']),
    // 普通方法
    handleClick(tab){
      this.activeName = tab.name;
    },
    handleClose(){
      this.visible = false;
    },
    //打开模态框设置派单对象
    paidanHandler(orderId){
      this.params.orderId = orderId;
      this.visible = true;
      // this.showModal();
      //动态绑定visibility，通过修改“visibility”属性实现显示切换。
      //visibility:hidden可让元素生成不可见盒，元素虽不可见，但仍生成盒模型，保持占位。
    },
    //派单
    sendOrderHandler(){
      if (this.params.orderId!== 0 && this.params.waiterId!==0){
        this.sendOrder(this.params).then(()=>{
          this.visible = false;
          this.$notify({title:'成功',message:this.message,type:'success'})
        })
      }
    },
    // 取消派单处理函数
    cancelHandler(orderId){
      this.cancelSendOrder(orderId).then(()=>{
        this.$notify({ title: '成功', message: this.message, type: 'success' });
      })
    },
    toDetails(order) {
      // 跳转到顾客详情页面
      this.$router.push({
        path: '/order/details',
        query: { id: order.id },
        params: { order }
      })
    },
    idsChangeHandler(val) {
      this.ids = val.map(item => item.id)
    },
    dialogCloseHandler() {
      this.$refs.orderForm.clearValidate()
    }
  }
}
</script>

<style scoped>

</style>
