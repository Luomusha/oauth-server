import Router from "@koa/router"

const router = new Router()
router.prefix("/login")

router.post("/", async (ctx) => {
    const { code, clientId, redirectUri, grantType } = ctx.request.body
    const client_secret = "xxx"
    console.log("===")
    const formdata = new URLSearchParams()
    formdata.append("client_id", clientId)
    formdata.append("client_secret", client_secret)
    formdata.append("grant_type", grantType)
    formdata.append("redirect_uri", redirectUri)
    formdata.append("code", code)
    const res = await fetch("http://localhost:3000/oauth/token", {
        method: "POST",
        body: formdata
    })
    if (res.statusText === "ok") {

        const token = await res.json()
        console.log("token", token)
        ctx.body = token + "--"
    } else {
        ctx.status = res.status
        ctx.body = await res.text()
    }
})

export default router
