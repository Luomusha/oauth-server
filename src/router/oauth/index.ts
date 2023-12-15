import Router from "@koa/router"
import authenticate from "./authenticate"
import authorize from "./authorize"
import token from "./token"
import login from "./login"

const router = new Router()
router.prefix("/oauth")

router.use(login.routes())
router.use(token.routes())
router.use(authorize.routes())
router.use(authenticate.routes())

export default router