import Router from "@koa/router"
import client from "./client"
import user from "./user"
import token from "./token"
import login from "./login"
import statistic from "./statistic"

const router = new Router()
router.prefix("/api")

router.use(client.routes())
router.use(user.routes())
router.use(token.routes())
router.use(login.routes())
router.use(statistic.routes())

export default router