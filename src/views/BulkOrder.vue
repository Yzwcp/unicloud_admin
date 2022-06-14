<template>
    <div>
        <a-radio-group style="float:left" v-model:value="conditionParams.status" button-style="solid">
            <a-radio-button :value="1">进行中</a-radio-button>
            <a-radio-button :value="2">待发货</a-radio-button>
            <a-radio-button :value="3">已发货</a-radio-button>
        </a-radio-group>
        <yuan-table :columns="columns" @getRecord="getRecord" :loading="confirmLoading"  @handleReresh="handleReresh" :dataSource="dataSource" :pagination="pagination" @change="paginationChange">
                  <template  v-slot:_id="{record}">
                        <a-tooltip placement="topLeft">
                            <template #title>
                            <span>{{record._id}}</span>
                            </template>
                            <span>{{record._id}}</span>
                        </a-tooltip>
                  </template>
                  <template  v-slot:user_id="{record}">
                        <a-tooltip placement="topLeft">
                            <template #title>
                            <span>{{record.user_id}}</span>
                            </template>
                            <span>{{record.user_id}}</span>
                        </a-tooltip>
                  </template>
                 <template  v-slot:action="{record}">
                        <a-button v-if="record.status==2" type="primary" @click="handledit(record)">发货</a-button>
                        <!-- <a-button  type="primary" @click="handledit(record)">编辑</a-button> -->
                  </template>
        </yuan-table>
        <yuan-modal 
            :visible="visible"
            @cancel="visible=false"  
            :confirm-loading="confirmLoading" 
            :action="action"
            :title="title"
            @ok="handleOk">
            <a-form
                :model="formState"
                name="basic"
                ref="formRef"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 10 }"
                autocomplete="off"
                @finish="onFinish"
                :rules="rules"
            >
                <a-form-item label="物流单号" name="way_number" >
                    <a-input v-model:value="formState.way_number" />
                </a-form-item>
                
            </a-form>
        </yuan-modal>
    </div>
</template>

<script>
import columns from './colums/bulkordercolumns'
import yuanTable from "@/components/yuanTable.vue";
import yuanModal from "@/components/yuanModal.vue";

export default {
    name: 'AdminwxBulkOrder',
    components:{
        yuanTable,yuanModal
    },
    data() {
        return {
            columns,
            dataSource:[],
            visible:false,
            confirmLoading:false,
            action:'',
            title:'',
            formState:{},
            row:{},
            rules:{
                way_number:{required: true, message: '请输入物流单号'},
                
            },
            pagination:{
                pageSize: 10, // 默认每页显示数量
				showSizeChanger: true, // 显示可改变每页数量
				pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
				showTotal: total => `Total ${total} items`, // 显示总数
				showSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
            },
            conditionParams:{
                status:1
            }
        };
    },
    watch:{
        'conditionParams.status'(val){
            if(!val)return this.initData({},'adminquery')
            this.initData({status:val},'adminquery')
        },
    },
    mounted() {
        this.initData({},'adminquery')
    },

    methods: {
        handledit(record){
            this.row = {...record}
            this.visible =true
        },
        async handleOk(){
            this.$refs.formRef.validate().then(async res=>{
              let {success,msg} =await  this.$api.bulkordercenter({...this.formState,_id:this.row._id,status:3},'edit')
              if(success){
                  this.visible = false
                  this.formState = {}
                  this.$message.success('更新成功')
                  this.initData({},"adminquery")
              }else{
                   this.$message.error(msg)
              }
            })
        },
        clearParams(){
            // this.status = 0
        },
        handleReresh(){
            this.clearParams()
            this.initData({},'adminquery')

        },
        initData(data,action){
            this.confirmLoading=true
            this.$api.bulkordercenter({data,...this.conditionParams},action).then(res=>{
                if(action=='adminquery'){
                    this.dataSource =res.data.data
                    return
                }else{
                    this.initData({},'adminquery')
                    this.visible=false
                }

            }).finally(()=>{
                this.confirmLoading=false
            })
        },
  

    },
};
</script>

<style lang="scss" scoped>

</style>