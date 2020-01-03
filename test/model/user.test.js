/**
 * @description model user test
 * @author 王子豪
 */

const User   = require('../../src/db/model/user')


test('User 符合预期数据模型判断',()=>{
    //build 会构成内存实例不会存到数据库中
    const user = User.build({
        userName:'zihao',
        password:'123',
        nickName:'子豪',
        city:'上海',
        picture:'xx.png',
    })

    expect(user.userName).toBe('zihao')
    expect(user.password).toBe('123')
    expect(user.nickName).toBe('子豪')
    expect(user.gender).toBe(3)//测试gender的默认值
    expect(user.city).toBe('上海')
    expect(user.picture).toBe('xx.png')
})