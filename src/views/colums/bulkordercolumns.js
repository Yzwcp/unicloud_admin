export default [{
    title: 'id',
    dataIndex: '_id',
    key: '_id'
},{
    title: '商品id',
    dataIndex: 'bulk_id',
    key: 'bulk_id'
},{
    title: '用户id',
    dataIndex: 'user_id',
    key: 'user_id'
},{
    title: '状态',
    dataIndex: 'status',
    key: 'status'
},{
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    customRender: ({text,record}) => { // customRender属性是一个方法，可接收三个参数（val,row,index），分别是当前值、当前行数据和当前索引，与方式 1 中模版的 slot-scope 属性传参类似
        let addr = JSON.stringify(text)
        return  addr
    }

},{
    title: '操作',
    dataIndex: 'operation',
    key: 'operation'
}]