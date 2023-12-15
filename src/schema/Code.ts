import { Model, DataTypes } from "sequelize";
import sequelize from "../common/db";
import { Client as ClientType, Code as CodeType, User as UserType } from "../types"
import Client from "./Client";
import User from "./User";

class Code extends Model implements CodeType {
    declare authorizationCode: string;
    declare expiresAt: Date;
    declare redirectUri: string;
    declare scope: string;
    declare cid: string;
    declare uid: number;
    declare createdAt?: Date
    declare updatedAt?: Date
}

Code.init({
    authorizationCode: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    redirectUri: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scope: {
        type: DataTypes.STRING
    },
    cid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
});

Client.hasMany(Code, { foreignKey: "cid" })
Code.belongsTo(Client, { foreignKey: "cid" })

User.hasMany(Code, { foreignKey: "uid" })
Code.belongsTo(User, { foreignKey: "uid" })

export default Code