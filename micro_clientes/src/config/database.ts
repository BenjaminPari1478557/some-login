import { Sequelize, Dialect } from "sequelize";

let sequelize: Sequelize;

try {
  const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT} = process.env;
  if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT || !DB_PORT) {
    throw new Error("Faltan variables de entorno para la base de datos");
  }

  sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
      host: DB_HOST,
      dialect: DB_DIALECT as Dialect,
      port: parseInt(DB_PORT),
      logging: console.log,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
} catch (error) {
  console.error("Error al conectar con la base de datos:", error);
  process.exit(1);
}

export default sequelize!;