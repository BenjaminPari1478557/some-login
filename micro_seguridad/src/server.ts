import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { sequelize, Token } from "./models"

const init = async () => {
  let connected = false;
  let retries = 5;
  while (!connected && retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("Modelos registrados:", Object.keys(sequelize.models));
      await sequelize.sync({ alter: true });
      console.log("Conexion a la BD establecida");
      connected = true;
    } catch (error) {
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
