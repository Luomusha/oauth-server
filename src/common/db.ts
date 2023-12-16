import { Sequelize } from "sequelize";
import { DB_HOST, DB_PASS, DB_USER } from "./config";
import { logger } from "./logger";

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    password: DB_PASS,
    username: DB_USER,
    define: { schema: 'oauth' },
    logging: msg => logger.info(msg),
});

sequelize.authenticate()
    .then(() => {
        return sequelize.createSchema("oauth", {})
    }).then(() => {
        return sequelize.sync({ force: false })
    }).then(() => {
        console.log("db connected...")
    })

export default sequelize
