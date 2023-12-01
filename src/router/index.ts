import Router from "@koa/router"
import client from "./client"

const router = new Router()

router.use(client.routes())
export default router