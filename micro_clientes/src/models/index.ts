//Inicializador de modelos
import sequelize from "../config/database";
import { initClienteModel } from "./cliente";
import { initParametroModel } from "./parametro";

const Cliente = initClienteModel(sequelize);
const Parametro = initParametroModel(sequelize);

export { sequelize ,Cliente, Parametro };