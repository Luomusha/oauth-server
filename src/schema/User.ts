import { Model, DataTypes } from "sequelize";
import sequelize from "../common/db";
import { User as UserType, UserAuth as UserAuthType, UserAgent as UserAgentType } from "../types"
import Client from "./Client";

class User extends Model implements UserType {
    declare readonly id: string
    declare username: string
    declare avatar: string
    declare createdAt?: Date
    declare updatedAt?: Date
}

export class UserAuth extends Model implements UserAuthType {
    declare readonly id: string;
    declare readonly uid: string;
    declare identityType: string;
    declare identifier: string;
    declare certificate: string;
    declare createdAt?: Date
    declare updatedAt?: Date
}

export class UserAgent extends Model implements UserAgentType {
    declare readonly uid: string;
    declare readonly agent: string;
    declare readonly ip: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
});

UserAuth.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    identityType: {
        type: DataTypes.ENUM,
        values: ['email', "mobile"],
        allowNull: false,
    },
    identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    certificate: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
})

User.hasMany(UserAuth, { foreignKey: "uid" })
UserAuth.belongsTo(User, { foreignKey: "uid" })


export default User
