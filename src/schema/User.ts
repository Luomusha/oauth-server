import { Model, DataTypes } from "sequelize";
import sequelize from "../common/db";
import { User as UserType } from "../types"

class User extends Model implements UserType {
    declare id: string
    declare username: string
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'User'
});

export default User