import Router from "@koa/router"

const client = new Router()
client.prefix("/clients")

client.get("/", async (ctx) => {
    ctx.body = "hello"
})

client.post("/", async (ctx) => {
    ctx.body = "hello"
})


export default client