import * as amqp from "amqplib";

let connection: any;
let channel: amqp.Channel;

export const initRabbitMQ = async () => {
  let retries = 5;
  let connected = false;

  while (!connected && retries > 0) {
    try {
      const rabbitUrl = process.env.RABBIT_URL || "amqp://guest:guest@rabbitmq:5672";
      connection = await amqp.connect(rabbitUrl);
      channel = await connection.createChannel();
      await channel.assertQueue("cola-registro-clientes", { durable: true });
      console.log("Conectado a RabbitMQ");
      connected = true;
    } catch (error) {
      retries--;
      console.error("Error al conectar con RabbitMQ: ", error);
      if (retries === 0) {
        console.log("No se puedo conectar al servicio");
      }
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

export const sendToQueue = async (queue: string, message: any) => {
  if (!channel) await initRabbitMQ();
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};
