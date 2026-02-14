import { DataTypes, Sequelize } from "sequelize";

export const initTokenModel = (sequelize: Sequelize) => {
    return sequelize.define('Token', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token_value: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true
        },
        is_used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'security_tokens',
        timestamps: true
    });
};