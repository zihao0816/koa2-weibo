const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const RedisStore = require('koa-redis')
const {SESSION_SECRET_KEY} = require('./config/sectetKey')

const { REDIS_CONF } = require('./config/db')

const index = require('./routes/index')
const users = require('./routes/users')
const userApiRouter = require('./routes/api/user')
const loginViewRouter = require('./routes/view/user')
const errorViewRouter = require('./routes/view/error')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

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
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(loginViewRouter.routes(), loginViewRouter.allowedMethods())
app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods())//404需要放到最后


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
