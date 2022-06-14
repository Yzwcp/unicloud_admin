export default [{
    title: 'id',
    dataIndex: '_id',
    key: '_id'
},{
    title: '标题',
    dataIndex: 'title',
    key: 'title'
},{
    title: '图片',
    dataIndex: 'content_img',
    key: 'content_img'
},{
    title: '原价',
    dataIndex: 'old_price',
    key: 'old_price'
},{
    title: '价格',
    dataIndex: 'price',
    key: 'price'
},{
    title: '状态',
    dataIndex: 'stand',
    key: 'stand',
    customRender: ({text,record}) => { // customRender属性是一个方法，可接收三个参数（val,row,index），分别是当前值、当前行数据和当前索引，与方式 1 中模版的 slot-scope 属性传参类似
        let statusObj={
            0:'已下架',
            1:'已上架',
        }
        return statusObj[text]
    }
},{
    title: '人数',
    dataIndex: 'groupsize',
    key: 'groupsize',
},{
    title: '操作',
    dataIndex: 'operation',
    key: 'operation,edit,delete'
}]