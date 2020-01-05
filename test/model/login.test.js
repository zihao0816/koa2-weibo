/**
 * @description user api test
 * @author 王子豪
 */

const server = require('../server')
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1

}

let COOKIE = ''
//注册
test('测试用户注册是否成功', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).toBe(0)
})

//重复注册失败
test('重复注册用户失败', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).not.toBe(0)
})

//用户名是否存在
test('测试用户名是否存在', async () => {
    const res = await server.post('/api/user/isExist').send({ userName })
    expect(res.body.errno).toBe(0)
})

//测试json schema验证是否成功
test('json schema 校验是否成功', async () => {
    const res = await server.post('/api/user/register').send({
        userName: '123',
        password: 'a',
        gender: 'sex'
    })
    expect(res.body.errno).not.toBe(0)
})

//登录
test('测试login', async () => {
    let res = await server.post('/api/user/login').send(
        {
            userName,
            password,
        }
    )

    expect(res.body.errno).toBe(0)
    COOKIE = res.headers['set-cookie'].join(';')
})

//修改用户基本信息
test('修改用户基本信息测试', async () => {
    let res = await server.patch('/api/user/changeInfo').send({
        nickName: '测试名称',
        picture: 'ccc.png',
        city: '测试城市'
    }).set('cookie', COOKIE)

    expect(res.body.errno).toBe(0)
})

//修改密码应该成功
test('test:修改密码', async () => {
    let res = await server.patch('/api/user/changePassword')
        .send({ newPassword: `p_${Date.now()}` }).set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

//删除
test('测试删除用户', async () => {
    let res = await server.post('/api/user/delete').set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

//退出
test('test:退出登录应该成功', async () => {
    let res = await server.post('/api/user/logout').set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

//再次查询用户
test('测试查询用户不存在', async () => {
    const res = await server.post('/api/user/isExist').send({
        userName
    })
    expect(res.body.errno).not.toBe(0)
})