import { Context, Next } from "koa";
import { createLogger, format, transports } from "winston";
import { randomId } from "./util";

export const logger = createLogger({
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({
            filename: 'combined.log',
            format: format.combine(
                format.timestamp(),
                format.splat(),
                format.json(),
            ),
            level: "info"
        }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.splat(),
                format.simple(),
            ),
        }),
    ],
    exitOnError: true,
})

export const middleware = async (ctx: Context, next: Next) => {
    const requestId = randomId()
    const childLogger = logger.child({ requestId });
    ctx.log = childLogger
    childLogger.info(`${ctx.request.method} ${ctx.request.path}`)
    await next()
}