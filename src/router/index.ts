import Router from "@koa/router"
import api from "./api"
import oauth from "./oauth"

const router = new Router()

router.use(oauth.routes())
router.use(api.routes())

export default router
