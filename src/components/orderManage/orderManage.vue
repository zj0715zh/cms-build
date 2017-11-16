<template>
  <section id="orderManage">
    <div class="after_sale">
      <el-form :inline="true" :model="orderForm" ref="orderForm" :rules="rules" class="demo-form-inline">
        <el-form-item label=" PPD订单号:" prop="orderNo">
          <el-input v-model="orderForm.orderNo" placeholder="请输入PPD订单号"></el-input>
        </el-form-item>
        <el-form-item label="供应商订单号:" prop="sellerOrderNo">
          <el-input v-model="orderForm.sellerOrderNo" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人:" prop="consignee">
          <el-input v-model="orderForm.consignee" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label=" 收货人手机号:" prop="phoneNo">
          <el-input v-model.number="orderForm.phoneNo" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="startTime" >
        <el-date-picker v-model="orderForm.startTime" type="date" placeholder="选择开始时间范围"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endTime" >
          <el-date-picker v-model="orderForm.endTime" type="date" placeholder="选择结束时间范围"></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="submitForm('orderForm')" style="margin-left: 28px;" icon="search">查询</el-button>
      </el-form>
    </div>
    <div class="table_list">
      <el-table :data="tableData" border  v-loading.body="tableLoading" element-loading-text="拼命加载中">
        <el-table-column align="center" prop="orderNo" label="PPD订单号" width="110%"></el-table-column>
        <el-table-column align="center" prop="sellerOrderNo" label="商户订单号" width="110%"></el-table-column>
        <el-table-column align="center" prop="expressAddress" label="配送地址" ></el-table-column>
        <el-table-column align="center" prop="consignee" label="收货人" width="100%"></el-table-column>
        <el-table-column align="center" prop="phoneNo" label="收货人手机号" width="125%"></el-table-column>
        <el-table-column align="center" prop="productName" label="商品名称"></el-table-column>
        <el-table-column align="center" prop="orderAmount" label="订单金额" width="100%"></el-table-column>
        <el-table-column align="center" prop="orderStatusTxt" label="订单状态" width="100%"></el-table-column>
        <el-table-column align="center" prop="orderCreateTime" label="下单时间">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 2px">{{scope.row.orderCreateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sellerName" label="供应商" width="100%"></el-table-column>
        <el-table-column align="center" prop="orderNote" label="备注"></el-table-column>
        <el-table-column align="center" prop="moreAction" label="更多操作" width="100%">
          <template scope="scope">
            <el-button v-if="scope.row.orderStatus==100" size="small" @click="orderSend(scope.$index, scope.row)" class="list_down" >发货</el-button>
           <!-- <el-button size="small" @click="orderOther(scope.$index, scope.row)" class="list_down pd10">备注</el-button>-->
           <!-- <el-button size="small" @click="orderDetail(scope.$index, scope.row)" class="list_down pd10">订单详情</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog title="确认收货人信息" size="tiny" :visible.sync="dialogVisible" :beforeClose="handleBeforeClose">
        <el-form :model="formSend" :rules="rules"   ref="formSend" class="demo_formPass" v-loading.body="submitting" element-loading-text="提交中">
          <el-form-item label="PPD订单号"  prop="orderNo"  :label-width="formLabelWidth" required>
            <el-input type="input" readonly="readonly"  v-model="formSend.orderNo" placeholder="PPD订单号" style="width: 260px" ></el-input>
          </el-form-item>
         <!-- <el-form-item label="商家名称"  prop="sellerName"  :label-width="formLabelWidth" required>
            <el-input type="input" v-model="formSend.sellerName" placeholder="电商名称" style="width: 260px"></el-input>
          </el-form-item>
          <el-form-item label="供应商订单号" prop="sellerOrderNo" :label-width="formLabelWidth">
            <el-input type="input" v-model="formSend.sellerOrderNo" placeholder="订单号" style="width: 260px"></el-input>
          </el-form-item>-->
          <el-form-item label="快递公司名称" :label-width="formLabelWidth" prop="expressName" required>
            <el-input type="input" v-model="formSend.expressName" placeholder="快递公司名称" style="width: 260px"></el-input>
          </el-form-item>
          <el-form-item label="快递单号" :label-width="formLabelWidth" prop="expressCode" required>
            <el-input type="input" v-model="formSend.expressCode" placeholder="快递单号" style="width: 260px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog_footer tc">
          <el-button type="primary" @click="submitSend('formSend')">确认</el-button>
          <el-button @click="dialogVisible = false;submitting=false;">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog title="备注提示" size="tiny" :visible.sync="dialogFormVisible">
        <el-form :model="formRemark"  class="demo_formPass" ref="formRemark" :rules="rules">
          <el-form-item label="PPD订单号"  prop="orderNo"  :label-width="formLabelWidth" required>
            <el-input type="input" v-model="formRemark.orderNo" placeholder="PPD订单号" style="width: 260px"></el-input>
          </el-form-item>

          <el-form-item label="备注"  prop="remark"  :label-width="formLabelWidth">
            <el-input type="textarea" v-model="formRemark.remark" style="width: 260px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog_footer tc">
          <el-button type="primary" @click="submitForm('formRemark')">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  <div class="dialog" >
      <el-dialog title="订单详情" :visible.sync="dialogDetailVisible" >
        <el-table :data="DetailDate" border v-loading.body="DetailListLoading" element-loading-text="拼命加载中"  >
          <el-table-column  label="订单号" width="150%" align="center" prop="orderNo"></el-table-column>
          <el-table-column align="center" width="100%" prop="orderAmount" label="订单金额" ></el-table-column>
          <el-table-column align="center" width="100%" prop="orderStatus" label="订单状态"></el-table-column>
          <el-table-column align="center" width="120%" prop="orderCreateTime" label="下单时间"></el-table-column>
          <el-table-column align="center"  width="150%" prop="orderNote" label="备注信息"></el-table-column>
          <el-table-column align="center" width="100%" prop="errormsg" label="错误信息"></el-table-column>
          <el-table-column align="center" width="150%" prop="isuser" label="是否使用优惠券"></el-table-column>
          <el-table-column align="center" width="140%" prop="ppdsku" label="PPD SkuId"></el-table-column>
          <el-table-column align="center"   width="150%" prop="descript" label="商品描述"></el-table-column>
        </el-table>
        <span class="lin40">供应商信息</span>
        <el-table :data="AgentinfoData"  border >
          <el-table-column align="center" prop="sellerId" label="sellerId" ></el-table-column>
          <el-table-column align="center"  prop="sellerName" label="商户名"></el-table-column>
          <el-table-column align="center"  prop="sellerOrderNo" label="商户订单号"></el-table-column>
          <el-table-column align="center"  prop="agentsku" label="商户sku"></el-table-column>
          <el-table-column align="center"  prop="agenttime" label="商户交互时间"></el-table-column>
        </el-table>
        <span class="lin40">配送信息</span>
        <el-table :data="SendinfoData" border >
          <el-table-column align="center"  prop="consignee" label="收货人姓名"></el-table-column>
          <el-table-column align="center"   prop="phoneNo" label="收货人手机"></el-table-column>
          <el-table-column align="center"   prop="expressAddress" label="收货人详细地址"></el-table-column>
          <el-table-column align="center"   prop="expressName" label="物流公司"></el-table-column>
          <el-table-column align="center"   prop="expressCode" label="物流单号"></el-table-column>
          <el-table-column align="center"   prop="isuse" label="是否使用优惠券"></el-table-column>
          </el-table>
      </el-dialog>
  </div>
    <div class="pagination" v-if="showPagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        :total="totalCount"
        layout="total, prev, pager, next">
      </el-pagination>
    </div>
  </section>
</template>
<script>
  import Vue from 'vue'
  import { Form,FormItem,Input,Button,Select,Option,DatePicker,Table,TableColumn,Pagination,Icon,Dialog} from 'element-ui'
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(Table);
  Vue.use(DatePicker);
  Vue.use(TableColumn);
  Vue.use(Pagination);
  Vue.use(Icon);
  Vue.use(Dialog);
  export default {
    name: "orderManage",
    data() {
      var checkPhone = (rules, value, callback) => {
        /*if (!value) {
          return callback(new Error('号码不能为空'));
        }*/
        setTimeout(() => {
          if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          var reg=/^(13|14|15|17|18)[0-9]{9}$/;
          if (!reg.test(value)) {
            callback(new Error('手机号输入错误'));
          } else {
            callback();
          }
        }
      }, 1000);
      };
      return {
        orderForm: {
          orderNo:'',
          sellerOrderNo: '',
          consignee: '',
          phoneNo: '',
          startTime: '',
          endTime:''
        },
        formSend: {
          orderNo:'',
          sellerName: '',
          sellerOrderNo: '',
          expressName: '',
          expressCode: '',
          orderStatus:''
        },
        formRemark:{
          orderNo:'',
          remark:''
        },
        rules: {
         /*consignee: [
            {  message: '请输入收货人', trigger: 'change' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符' }
          ],
          sellerName:[
            { message: '请输入供应商名称', trigger: 'change' },
            { min: 2, max: 20,required: true, message: '长度在 2 到 20 个字符'}
          ],
          expressAddress:[
            {  message: '请输入配送地址', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6到 100 个字符'}
          ],*/
          expressName:[
            {  message: '请输入快递公司名称', trigger: 'blur' },
            { min: 2, max: 50, required:true, message: '名称在 2 到 50 个字符'}
          ],
         /* orderNo:[
            {  message: '请输入PPD订单号', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符' }
          ],*/
         /* remark:[
            {  message: '请输入备注', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符' }
          ],*/
          expressCode:[
            {  message: '请输入快递单号', trigger: 'blur' },
            { min: 8, max: 50, required:true, message: '单号在 8 到 50个字符'}
          ]
         /* sellerOrderNo:[
            { message: '请输入订单号', trigger: 'blur' },
            { min: 2,max: 32, message: '长度在 2 到 32个字符'}
          ],*/
         /* phoneNo:[
            {  trigger: 'blur' },
            { type:'number', max: 11, validator: checkPhone}
          ]*/
        },
        tableData: [],
        DetailDate:[],
        SendinfoData:[],
        AgentinfoData:[],
        tableLoading: true,
        DetailListLoading:true,
        dialogFormVisible: false,
        dialogVisible: false,
        dialogDetailVisible:false,
        showPagination:false,
        submitting:false,
        formLabelWidth: '120px',
        pageIndex: 1,
        pageSize:10,
        totalPage:1,
        totalCount:1
      };
    },
    methods: {
      getOrderAjax(){
        var vm = this;
        this.tableLoading = true;
        //console.log(vm.orderForm.phoneNo)
        this.$ajax.post('/order/querySellerOrder',{
          "orderNo":vm.orderForm.orderNo.replace(/\s+/g,""),
          "sellerOrderNo":vm.orderForm.sellerOrderNo.replace(/\s+/g,""),
          "consignee":vm.orderForm.consignee.replace(/\s+/g,""),
          "phoneNo":vm.orderForm.phoneNo.toString().replace(/\s+/g,""),
          "startTime":vm.orderForm.startTime,
          "endTime":vm.orderForm.endTime,
          "pageIndex":vm.pageIndex,
          "pageSize":vm.pageSize
        }).then((response)=> {
            this.tableData = response.data.content.orders;
            this.pageIndex= response.data.content.pageIndex;
            this.totalCount= response.data.content.totalCount;
            this.tableLoading = false;
            this.showPagination = true;
        })
        .catch((error)=> {
            console.log(error);

        })
      },
     /* getDetailAjax(){
        this.DetailListLoading = true;
        this.$ajax.get('/data/orderManage/detailList.json')
          .then((response)=>{
          this.DetailDate = response.data.DetailDate;
        this.AgentinfoData=response.data.AgentinfoData;
        this.SendinfoData=response.data.SendinfoData;
        this.DetailListLoading = false;
      })
      .catch(error=>{
          console.log(error);
      })
      },*/
      /*查询*/
      submitForm() {
        this.getOrderAjax();
      },
      getSendAjax(){
          var vm = this;
          this.$ajax.post('/order/manualDeliver',vm.formSend).then((response)=> {
            // vm.formSend=response.data.content;
            this.submitting=false;
            vm.dialogVisible = false;
        if(response.data.code == "1"){
          vm.$message({
            showClose: true,
            message: '发货成功',
            type: 'success'
          });
          setTimeout(()=>{
            window.location.reload();
        },1000)
        }else{
          vm.$message({
            showClose: true,
            message: response.data.message,
            type: 'error'
          });
        }
        })
        .catch((error)=> {
          this.submitting=false;
        //console.log(response.data.meaasge);
        });
        },
      handleBeforeClose(done){
        this.dialogVisible = false;
      },
      /*发货*/
      submitSend(formName){
        var vm = this;
           this.$refs[formName].validate((valid) => {
           if (valid) {
              this.submitting=true;
             this.getSendAjax();
           } else {
             return false;
            }
           });
      },
      orderSend(index,row){
          var vm = this;
        this.dialogVisible = true;
         vm.formSend.orderNo=row.orderNo;
         vm.formSend.sellerOrderNo=row.sellerOrderNo;
         vm.formSend.sellerName=row.sellerName;
      },
      /*备注*/
     /* orderOther(){
        this.dialogFormVisible=true;
      },*/
      orderDetail(index, row){
        this.dialogDetailVisible=true;
        setTimeout(()=>{
          this.getDetailAjax();
      },200)
      },
      handleSizeChange(val) {
        this.getOrderAjax();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getOrderAjax();
        console.log(`当前页: ${val}`);
      },
      handleEnter(){
        var vm = this;
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13
                vm.getOrderAjax(); //调用查询接口
            }
        };
      }
    },
    created(){
      this.getOrderAjax();
      this.handleEnter();
      this.$store.commit('set_isLoading',{isLoading:false});
      this.$store.commit('set_BreadcrumbList', {BreadcrumbList: [{name: '订单管理', href: '/orderManage'}]})
    }
  }

</script>
<style scoped lang="css" src="./orderManage.css">
</style>
