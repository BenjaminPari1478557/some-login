import { DataTypes, Sequelize } from "sequelize";

export const initClienteModel = (sequelize: Sequelize) => {
    return sequelize.define('Cliente', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_documento: {
            type: DataTypes.ENUM('DNI', 'CE'),
            allowNull: false
        },
        nro_documento: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        nombres: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        bono_bienvenida: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'clientes',
        timestamps: true
    });
};