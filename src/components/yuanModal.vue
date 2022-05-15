<template>
        <div>
            <a-modal
            v-bind="$props" 
            v-on="$listeners"
            :title="title"
            >
            <slot></slot>
            </a-modal>
        </div>
    
</template>

<script>
import {Modal} from 'ant-design-vue'
export default {
    name: 'AdminwxYuanModal',
    props:{
        ...Modal.props,
        action:{
            type:String,
            default:''
        },
        width:{
            type:Number,
            default:900
        },
    },
    data() {
        
    },
    created(){
        
  
    },
    mounted() {

    },

    methods: {
    },
};
</script>

<style lang="scss" scoped>

</style>