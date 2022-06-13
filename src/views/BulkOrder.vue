<template>
    <div>
        <yuan-table :columns="columns" @getRecord="getRecord" :dataSource="dataSource">
                  <template  v-slot:action="{record}">
                        <a-button v-if="record.status==2" type="primary" @click="handledit(record)">发货</a-button>
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
        };
    },

    mounted() {
        this.initData({},'query')
    },

    methods: {
        handledit(record){
            console.log(record);
            console.log(record.status);
            this.row = {...record}
            this.visible =true
        },
        async handleOk(){
            this.$refs.formRef.validate().then(async res=>{
              let {success,msg} =await  this.$api.bulkordercenter({...this.formState,order_id:this.row._id},'addorderno')
              if(success){
                  this.visible = false
                  this.formState = {}
                  this.$message.success('更新成功')
                  this.initData({},"query")
              }else{
                   this.$message.error(msg)
              }
            })
        },
        initData(data,action){
            this.confirmLoading=true
            this.$api.bulkordercenter(data,action).then(res=>{
                if(action=='query'){
                    this.dataSource =res.data.data
                    return
                }else{
                    this.initData({},'query')
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