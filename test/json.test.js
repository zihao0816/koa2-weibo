
const server = require('./server')

test('json请求判断',async ()=>{
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title:'koa json'
    })
    expect(res.body.title).toBe('koa json')
})

// test('post请求判断',async ()=>{
//     const res = await server.post('/json').send({
//         userName:'张三',
//         password:'123'

//     })
//     expect(res.body).toEqual({c
//         title:'koa json'
//     })
//     expect(res.body.title).toBe('koa json')
// })