<template>
    <div>



        <yuan-table :columns="columns" @handleReresh="handleReresh" :loading="confirmLoading" @getRecord="getRecord" :dataSource="dataSource">
            
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
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 10 }"
                autocomplete="off"
                @finish="onFinish"
                :rules="rules"
            >
                <a-form-item label="活动标题" name="title" >
                    <a-textarea v-model:value="formState.title" />
                </a-form-item>
                <a-form-item label="原价" name="old_price" >
                    <a-input-number v-model:value="formState.old_price"  />
                </a-form-item>
                <a-form-item label="价格" name="price" >
                    <a-input-number v-model:value="formState.price"  />
                </a-form-item>
                <a-form-item label="成团需要人数" name="groupsize" >
                    <a-input-number v-model:value="formState.groupsize"  />
                </a-form-item>
                <a-form-item label="爆款置顶" name="virtual" >
                    <a-radio-group v-model:value="formState.hot" button-style="solid">
                        <a-radio-button :value="1">是</a-radio-button>
                        <a-radio-button :value="0">否</a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="是否虚拟" name="virtual" >
                    <a-radio-group v-model:value="formState.virtual" button-style="solid">
                        <a-radio-button :value="1">虚拟物品</a-radio-button>
                        <a-radio-button :value="0">实物(需物流)</a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="状态" name="virtual" >
                    <a-radio-group v-model:value="formState.stand" button-style="solid">
                        <a-radio-button :value="1">上架</a-radio-button>
                        <a-radio-button :value="0">下架</a-radio-button>
                    </a-radio-group>
                </a-form-item>
         
                <a-form-item label="结束时间" name="endtime" >
                     <a-date-picker v-model:value="formState.endtime" />
                </a-form-item>
                <a-form-item label="结束时间" name="endtime" >
                   <a-upload
                    :file-list="fileList"
                    list-type="picture"
                    class="upload-list-inline"
                    :before-upload='beforeUpload'
                    @change="handleUpload"
                    @remove="uploadremove"
                    >
                    <a-button>
                        <upload-outlined></upload-outlined>
                        upload
                    </a-button>
                    </a-upload>
                </a-form-item>
            </a-form>
        </yuan-modal>
    </div>
</template>

<script>
import yuanTable from "@/components/yuanTable.vue";
import yuanModal from "@/components/yuanModal.vue";
import columns from './colums/bulkcolumns'
import dayjs from "dayjs"
import * as qiniu from 'qiniu-js'
export default {
    name: 'AdminwxBulk',
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
            rules:{
                title:{required: true, message: '请输入活动标题'},
                old_price:{required: true, message: '请输入原价'},
                price:{required: true, message: '请输入价格'},
                groupsize:{required: true, message: '请输成团需要人数'},
            },
            fileList:[],
            imgToken:'',
        };
    },
    computed:{
        dayjs:()=>dayjs
    },
    mounted() {
        // this.$api.usercenter({username:'yzwyzw',password:'123456'},'login').then(res=>{
        //     console.log(res);
        // })
        // this.$api.bulkcenter({username:'yzwyzw',password:'123456'},'adminquery').then(res=>{
        //     console.log(res);
        // })
        this.initData({},'adminquery')
        this.upload({},'querytoken')
    },

    methods: {
        upload(data,action){
            this.$api.upload(data,action).then(res=>{
                if(action=='querytoken'){
                    console.log(res);
                   this.imgToken=res.data
                }else if(action=='removeImage'){
                console.log(res);
                }

            }).finally(()=>{
            })
        },
        uploadremove(f){
            // console.log(f.key);
            // this.upload({key:f.key},'removeImage')
            let arr = [...this.fileList]
            arr.map((item,index)=>{
                if(item.uid ==f.uid){
                    this.fileList.splice(index,1)
                }
            })
        },
        beforeUpload(file, fileList){
            return false;
        },
        handleReresh(){
            this.initData({},'adminquery')

        },
        handleUpload (files,fileList){

            
            let file =  files.file
            if(files.file.status==='removed'){
                return
            }
            let config = {
            useCdnDomain: true,
            forceDirect:true,//禁止片上传
            }
            let username = 'yzw'
            const name =username+ '/'+ file.lastModified+'_'+file.name
            const putExtra = null
            var observable = qiniu.upload(file, name, this.imgToken,{fname:file.name},config)
            observable.subscribe({
                    next: (result) => {
                        //上传进度
                        // if (response.total.percent > 0) {
                        //     /* code ···  */
                        // }
                    },
                    error: () => {
                        //上传失败
                        /* code ···  */
                    },
                    complete: (res) => {
                        console.log(res);
                        this.fileList.push({
                            uid:res.hash,
                            name:res.key.replace(username+"/",''),
                            key:res.key,
                            url:"http://umep.ltd/"+res.key,
                            thumbUrl:"http://umep.ltd/"+res.key,
                        })
                        //上传成功
                        /* code ···  */
                    },
                });
        },
        getRecord(record){
            const {row,action} = record
            this[action](row) 
            this.action = action
            if(this.action=='add'){
                this.editmode = true
                this.title='新增'
            }
            if(this.action=='edit'){
                this.editmode = false
                this.title='编辑'
            }
        },
        add(){
            this.uploadremove({},'removeImage')
            this.formState={}
            this.visible=true
            this.fileList=[]
        },
        edit(row){
            this.visible=true
            this.formState = {...row,endtime:dayjs(row.endtime)}
            this.fileList=[]
            row.content_img && (this.fileList = [...row.content_img])
        },
        remove(row){
            this.initData(row,"delete")
        },
        initData(data,action){
            this.confirmLoading=true
            this.$api.bulkcenter(data,action).then(res=>{
                if(action=='adminquery'){
                    this.dataSource =res.data
                    return
                }else{
                    this.initData({},'adminquery')
                    this.visible=false
                }

            }).finally(()=>{
                this.confirmLoading=false
            })
        },
        handleOk(){
            this.$refs.formRef.validate().then(res=>{
                let data = {...this.formState,content_img:this.fileList}
                data.endtime = dayjs(data.endtime).valueOf()
                switch(this.action){
                    case 'add':
                        this.initData(data,'add')
                        break;
                    case 'edit':
                        this.initData(data,'edit')
                        break;
                }
            })
        },
        onFinish(){

        },
        
    
    },
};
</script>

<style lang="less" scoped>

</style>