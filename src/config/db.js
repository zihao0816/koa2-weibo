
// const  { isPro}  = require('../utils/')
const REDIS_CONF = {
    port:6379,
    host:'127.0.0.1'
}
const MYSQL_CONF = {
    database:'koa2_weibo',
    user:'root',
    password:'root',
}



module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}