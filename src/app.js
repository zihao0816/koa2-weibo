const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const RedisStore = require('koa-redis')
const koaStatic = require('koa-static')
const path = require('path')

const {SESSION_SECRET_KEY} = require('./config/sectetKey')

const { REDIS_CONF } = require('./config/db')

const blogHomeApiRouter =require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const userApiRouter = require('./routes/api/user')
const loginViewRouter = require('./routes/view/user')
const utilesAoiRouter = require('./routes/api/utiles')
const errorViewRouter = require('./routes/view/error')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname,'..','uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

//设置session
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'weibo.sid',//cookie name 默认是 koa.sid
    prefix: 'weibo:sess:',//cooie 前缀 默认是koa:sess:
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: RedisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))
// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(blogHomeApiRouter.routes(),blogHomeApiRouter.allowedMethods())
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(loginViewRouter.routes(), loginViewRouter.allowedMethods())
app.use(utilesAoiRouter.routes(), utilesAoiRouter.allowedMethods())

app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods())//404需要放到最后


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
