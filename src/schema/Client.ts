import { Model, DataTypes } from "sequelize";
import sequelize from "../common/db";
import { Client as ClientType } from "../types"

class Client extends Model implements ClientType {
    declare readonly id: string;
    declare secret: string;
    declare name: string;
    declare logo: string;
    declare description: string;
    declare redirectUris: string[];
    declare grants: string[];
    declare accessTokenLifetime?: number;
    declare refreshTokenLifetime?: number;
    declare createdAt?: Date
    declare updatedAt?: Date
}

Client.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    secret: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    redirectUris: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    grants: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    accessTokenLifetime: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    refreshTokenLifetime: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
});


export default Client