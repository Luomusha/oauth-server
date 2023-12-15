import { Model, DataTypes } from "sequelize";
import sequelize from "../common/db";
import { Token as TokenType } from "../types"
import Client from "./Client";
import User from "./User";

class Token extends Model implements TokenType {
    declare accessToken: string;
    declare accessTokenExpiresAt: Date;
    declare refreshToken: string;
    declare refreshTokenExpiresAt: Date;
    declare scope: string;
    declare cid: string;
    declare uid: number;
    declare createdAt?: Date
    declare updatedAt?: Date
}

Token.init({
    accessToken: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    accessTokenExpiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refreshTokenExpiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    scope: {
        type: DataTypes.STRING,
        allowNull: false
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

Client.hasMany(Token, { foreignKey: "cid" })
Token.belongsTo(Client, { foreignKey: "cid" })

User.hasMany(Token, { foreignKey: "uid" })
Token.belongsTo(User, { foreignKey: "uid" })


export default Token
