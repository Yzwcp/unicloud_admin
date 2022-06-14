<template>
    <div>
        <a-button type="primary" style="float: right;margin-bottom: 20px;" @click="handladd">添加</a-button>
        <a-button type="default" style="float: left;margin-bottom: 20px;" @click="handleReresh">刷新</a-button>
        
        <a-table :dataSource="dataSource" :columns="columns" :loading="loading" :pagination="pagination" :scroll="{ x: 1300, y: 1000 }" key="id">
            <template #bodyCell="{ column,record }" >
                <template v-if="column.key=='_id'">
                    <slot name="_id"  :record="record"></slot>
                </template>
                <template v-if="column.key=='user_id'">
                    <slot name="user_id"  :record="record"></slot>
                </template>
                <template v-if="column.key.indexOf('operation')>-1">
                    <a-button v-if="column.key.indexOf('edit')>-1" type="primary" @click="handledit(record)">编辑</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="删除这条记录吗"
                        ok-text="是的"
                        cancel-text="No"
                        v-if="column.key.indexOf('delete')>-1">
                        
                        <a-button type="primary" danger >删除</a-button>
                    </a-popconfirm>
                    <a-divider type="vertical" />

                    <slot name="action"  :record="record"></slot>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script>
export default {
    name: 'AdminwxYuanTable',
    props:{
        columns:{
            type:Array,
            default:[]
        },
        dataSource:{
            type:Array,
            default:[]
        },
        pagination:{
            type:Object,
            default:{}
        },
        loading:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            row:null
        };
    },

    mounted() {
        
    },

    methods: {
        handledit(row){
            this.$emit('getRecord',{row:{...row},action:'edit'})
        },
        handleDelete(row){
            this.$emit('getRecord',{row:{...row},action:'remove'})
        },
        handladd(){
            this.$emit('getRecord',{row:{},action:'add'})

        },
        handleReresh(){
            this.$emit('handleReresh')
        },
    },
};
</script>

<style lang="scss" scoped>

</style>