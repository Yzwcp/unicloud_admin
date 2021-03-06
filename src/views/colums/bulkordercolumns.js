export default [{
    title: 'id',
    dataIndex: '_id',
    key: '_id',
    width:"100px",
    ellipsis:true
},{
    title: '用户id',
    dataIndex: 'user_id',
    key: 'user_id',
    width:"100px",
    ellipsis:true

},{
    title: '用户名',
    dataIndex: 'nickName',
    key: 'nickName',
    width:"100px",

},{
    title: '商品标题',
    dataIndex: 'bulk',
    key: 'bulk_id',
    width:"300px",

    customRender: ({text,record}) => { // customRender属性是一个方法，可接收三个参数（val,row,index），分别是当前值、当前行数据和当前索引，与方式 1 中模版的 slot-scope 属性传参类似
        if(text){
            return text[0].title
        }
    }
},{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width:"300px",

    customRender: ({text,record}) => { // customRender属性是一个方法，可接收三个参数（val,row,index），分别是当前值、当前行数据和当前索引，与方式 1 中模版的 slot-scope 属性传参类似
        let statusObj={
            "1":'正在进行',
            "2":'待发货',
            "-1":'异常',
            "3":'已发货',
            "4":'签收'
        }
        if(record.way_number){
            return statusObj[text]+"(物流："+record.way_number+")"

        }
        return statusObj[text]
    }
},{
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    customRender: ({text,record}) => { // customRender属性是一个方法，可接收三个参数（val,row,index），分别是当前值、当前行数据和当前索引，与方式 1 中模版的 slot-scope 属性传参类似
        if(text){
            let addr =  JSON.parse(text)
            if(addr.userName){
                return addr.userName+'-'+addr.telNumber+'-'+addr.provinceName+'-'+addr.cityName+'-'+addr.detailInfo

            }
            return addr
        }else{
            return '-'
        }
    }

},{
    title: '操作',
    dataIndex: 'operation',
    key: 'operation'
}]