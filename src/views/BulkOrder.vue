<template>
    <div>
        <yuan-table :columns="columns" @getRecord="getRecord" :dataSource="dataSource"></yuan-table>

    </div>
</template>

<script>
import columns from './colums/bulkordercolumns'
import yuanTable from "@/components/yuanTable.vue";

export default {
    name: 'AdminwxBulkOrder',
    components:{
        yuanTable
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
        };
    },

    mounted() {
        this.initData({},'query')
    },

    methods: {
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
        getRecord(){},

    },
};
</script>

<style lang="scss" scoped>

</style>