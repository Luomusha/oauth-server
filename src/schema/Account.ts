import { Model, DataTypes } from "sequelize";
import User from "./User";
import sequelize from "../common/db";
import { Account as AccountType } from "../types"

class Account extends Model implements AccountType {
    declare readonly id: string;
    declare readonly uid: string;
    declare identityType: string;
    declare identifier: string;
    declare certificate: string;
    declare createdAt?: Date
    declare updatedAt?: Date
}


Account.init({
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

User.hasMany(Account, { foreignKey: "uid" })
Account.belongsTo(User, { foreignKey: "uid" })


export default Account