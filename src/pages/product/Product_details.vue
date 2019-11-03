<template>
  <div class="product_details">
    <el-button-group>
      <el-button type="text" icon="el-icon-arrow-left" @click="backHandler">返回</el-button>
    </el-button-group><br>
    商品详情
    <p><strong>产品名称:</strong>{{product.name}}</p>
    <p><strong>产品单价:</strong>{{product.price}}</p>
    <p><strong>产品介绍:</strong>{{product.description}}</p>
    <p>产品主图
      <img :src="product.photo" alt=""></p>
  </div>
</template>

<script>
  import { mapActions,mapState} from 'vuex'

export default {
    data(){
      return {
        product:{}
      }
    },
  created(){
      //获取产品id
    this.product = this.$route.query.product
    //根据产品id查询产品的详情
    /*this.findProductById(id)
      .then((product)=>{
        this.product = product
        console.log("----",product)
      })*/
  },

  /*computed:{
    ...mapState('product',['findProductById'])
  },*/
  methods:{
    //...mapActions('product',['findProductById']),
    backHandler(){
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>

</style>
