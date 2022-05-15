import {request} from './request'
export const API = {
    usercenter:(data,action)=>{
        return request({url:'/usercenter',method:'post',data:{data:{...data},ex:{action}}})
    },
    bulkcenter:(data,action)=>{
        return request({url:'/bulkcenter',method:'post',data:{data:{...data},ex:{action}}})
    },
    upload:(data,action)=>{
        return request({url:'/upload',method:'post',data:{data:{...data},ex:{action}}})
    },
}