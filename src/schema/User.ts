import { Model, DataTypes } from "sequelize";
import sequelize from "../common/db";
import { User as UserType, UserAgent as UserAgentType, Client as ClientType } from "../types"

class User extends Model implements UserType {
    declare readonly id: string
    declare username: string
    declare avatar: string
    declare createdAt?: Date
    declare updatedAt?: Date
    declare clients?: ClientType[]
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


export default User
