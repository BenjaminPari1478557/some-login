import { DataTypes, Sequelize } from "sequelize";

export const initParametroModel = (sequelize: Sequelize) => {
    return sequelize.define('Parametro', {
        clave: {
            type: DataTypes.STRING(50),
            primaryKey: true //'ENABLE_EMAIL_SENDING'
        },
        valor: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        tableName: 'parametros_globales',
        timestamps: false
    });
};