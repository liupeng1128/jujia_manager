<template>
  <div class="product">
    <h2>产品管理</h2>
    <!-- 按钮 -->
    <div>
      <el-button size="small" type="primary" @click="toAddHandler">添加</el-button>
      <el-button size="small" type="danger" @click="batchDeleteHandler">批量删除</el-button>
    </div>
    <!-- 表格 -->
    <div>

      <el-table :data="products" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="产品名称" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="categoryId" label="所属产品" />
        <el-table-column label="操作" width="100" align="center">
          <template #default="record">
            <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
            <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" />
            <a href="" @click.prevent="toDetaillsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->

    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      {{product}}
      <el-form ref="productForm" :model="product" :rules="rules">
        <el-form-item label="名称" label-width="100px" prop="name">
          <el-input v-model="product.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="价格" label-width="100px" prop="price">
          <el-input v-model="product.price" auto-complete="off" />
        </el-form-item>
        <el-form-item label="所属栏目" label-width="100px" prop="categoryId">
          <el-select v-model="product.categoryId">
            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" label-width="100px">
          <el-input v-model="product.description" type="textarea" auto-complete="off" />
        </el-form-item>
        <el-form-item label="产品主图" label-width="100px">
          <el-upload
            class="upload-demo"
            action="http://134.175.154.93:6677/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
            :limit=1
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      fileList:[],
      product: {},
      ids: [],
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        categoryId: [
           { required: true, message: '请选择所属栏目', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('product', ['products', 'visible', 'title']),
    ...mapState('category', ['categories']),
    ...mapGetters('product', ['orderProduct', 'productSize'])
  },
  created() {
    // 查询所有产品
    this.findAllProducts()
    // 查询所有栏目
    this.findAllCategories()
  },
  methods: {
    ...mapMutations('product', ['showModal', 'closeModal', 'setTitle']),
    ...mapActions('product', ['findAllProducts', 'saveOrUpdateProduct', 'deleteProductById', 'batchDeleteProduct','findProductById']),
    ...mapActions('category', ['findAllCategories']),
    toDetaillsHandler(product) {
      this.$router.push({
        path: '/product/Product_details',
        query: {
          product
        }
      })
    },
    uploadSuccessHandler(response){
      //获取返回值中的id.然后将id设置到表单中product
      if(response.status === 200){
        let id = response.data.id;
        let photo = "http://134.175.154.93:8888/group1/"+id
        this.product.photo = photo;
        //克隆
        this.product = Object.assign({},this.product);
      }else{
        this.$message.error("上传异常!");
      }
    },
    // 普通方法
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    toAddHandler() {
      // 1. 重置表单
      this.product = {}
      this.setTitle('添加产品信息')
      // 2. 显示模态框
      this.showModal()
    },
    submitHandler() {
      // 校验
      this.$refs.productForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          const promise = this.saveOrUpdateProduct(this.product)
          promise.then((response) => {
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({ type: 'success', message: response.statusText })
          })
        } else {
          return false
        }
      })
    },
    dialogCloseHandler() {
      this.$refs.productForm.resetFields();
      this.closeModal();

    },
    editHandler(row) {
      this.product = row
      this.fileList.push({name:'old',url:'row.photo'})
      this.setTitle('修改产品信息')
      this.showModal()
    },
    deleteHandler(id) {
      this.deleteProductById(id)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    batchDeleteHandler() {
      this.batchDeleteProduct(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    }

  }

}
</script>
<style scoped>

</style>
