import { Sequelize } from "sequelize";
import { DB_HOST, DB_PASS, DB_USER } from "./config";

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    password: DB_PASS,
    username: DB_USER,
});

sequelize.authenticate()
    .then(() => {
        console.log("db connected...")
    })

export default sequelize