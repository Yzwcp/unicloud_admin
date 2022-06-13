<template>
    <div>
        <a-button type="primary" style="float: right;margin-bottom: 20px;" @click="handladd">添加</a-button>
        
        <a-table :dataSource="dataSource" :columns="columns"  :scroll="{ x: 1300, y: 1000 }" key="id">
            <template #bodyCell="{ column,record }" >
                <template v-if="column.key.indexOf('operation')>-1">
                    <a-button v-if="column.key.indexOf('edit')>-1" type="primary" @click="handledit(record)">编辑</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="删除这条记录吗"
                        ok-text="是的"
                        cancel-text="No"
                        v-if="column.key.indexOf('delete')>-1">
                        
                    >
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
    },
};
</script>

<style lang="scss" scoped>

</style>