import Koa from "koa"
import koaBody from "koa-body"
import views from 'koa-views'
import koaStatic from 'koa-static'
import dotenv from "dotenv"
import path from "path"
import router from "./router"
import { middleware as logger } from "./common/logger"

dotenv.config()

const app = new Koa({ proxy: true })
const ROOT = process.cwd()

const staticRoot = path.join(ROOT, 'static')
app.keys = ['OEK5zjaAMPc3L6iK7PyUjCOziUH3rsrMKB9u8H07La1SkfwtuBoDnHaaPCkG5Brg', 'MNKeIebviQnCPo38ufHcSfw3FFv8EtnAe1xE02xkN1wkCV1B2z126U44yk2BQVK7'];

app
    .use(koaStatic(staticRoot))
    .use(logger)
    .use(views(staticRoot, { extension: 'hbs', map: { hbs: 'handlebars' } }))
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)
