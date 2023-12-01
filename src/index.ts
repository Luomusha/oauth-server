import Koa from "koa"
import router from "./router"
import koaBody from "koa-body";

const app = new Koa();

app
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);
