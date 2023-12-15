import Router from "@koa/router"
import { Request, Response } from "oauth2-server"
import oauth from "../../common/oauth"

const router = new Router()
router.prefix("/token")

router.post("/", async ctx => {
    const request = new Request(ctx.request);
    const response = new Response(ctx.response);
    try {
        const token = await oauth.token(request, response)
        ctx.body = token
    } catch (e: any) {
        console.log(e)
        ctx.status = e.status
        ctx.body = e.message
    }
})

export default router