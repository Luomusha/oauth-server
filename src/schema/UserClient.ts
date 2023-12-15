import { DataTypes, Model } from "sequelize"
import User from "./User"
import Client from "./Client"
import sequelize from "../common/db"

class UserClient extends Model {
    declare readonly uid: number
    declare readonly cid: string
    declare createdAt?: Date
    declare updatedAt?: Date
}

UserClient.init({
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    cid: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize,
});

User.belongsToMany(Client, { through: 'UserClients', foreignKey: 'uid' })
Client.belongsToMany(User, { through: 'UserClients', foreignKey: 'cid' })

export default UserClient
