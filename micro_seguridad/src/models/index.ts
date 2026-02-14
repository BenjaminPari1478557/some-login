//Inicializador de modelos
import sequelize from "../config/database";
import { initTokenModel } from "./token";

const Token = initTokenModel(sequelize);

export { sequelize, Token };