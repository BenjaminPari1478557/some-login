import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { sequelize, Cliente, Parametro } from "./models";
import redisClient, { connectRedis } from "./config/redis";

const init = async () => {
  let connected = false;
  let retries = 5;
  while (!connected && retries > 0) {
    try {
      //Conexion con la BD e inicializacion de tablas
      await sequelize.authenticate();
      console.log("Modelos registrados:", Object.keys(sequelize.models));
      await sequelize.sync({ alter: true });
      console.log("Conexion a la BD establecida");

      const count = await Parametro.count();
      if (count === 0) {
        await Parametro.create({ clave: "envio_correos", valor: "true" });
        console.log("Parametro de inicializado");
      }

      //Conexion con Redis
      await connectRedis();
      const params = await Parametro.findAll();
      for (const p of params) {
        await redisClient.set((p as any).clave, (p as any).valor);
      }
      console.log("Parametros sincronizados con Redis");

      connected = true;
    } catch (error) { // Bloque para que se reintente cada tiempo hasta conectarse a la BD
      retries--;
      console.error("Error al conectar con la BD: ", error);
      if (retries === 0) process.exit(1);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  const server = new Server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
    routes: {
      cors: true,
    },
  });

  await server.register(require("./routes/routes.plugin"));

  try {
    await server.start();
    console.log(`Servidor de Seguridad corriendo en: ${server.info.uri}`);
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
