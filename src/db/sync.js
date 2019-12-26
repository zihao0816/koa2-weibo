/**
 * @description 同步数据库
 * @author 王子豪
 */

const seq = require('./seq')

// require('./model')

//测试连接
seq.authenticate().then(()=>{
    console.log('xxxx ok')
}).catch(()=>{
    console.log('xxxxx error')
})

seq.sync().then(()=>{
    console.log('成功 ok')
    process.exit()
    
}).catch(()=>{
    console.log('失败 error')
})