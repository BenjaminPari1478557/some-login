import * as amqp from 'amqplib';

export const startMailConsumer = async () => {
    let connected = false;
    let retries = 5;

    while (!connected && retries > 0) {
        try {
            const rabbitUrl = process.env.RABBIT_URL || 'amqp://guest:guest@rabbitmq:5672';
            const connection = await amqp.connect(rabbitUrl);
            const channel = await connection.createChannel();

            const queue = 'cola-registro-clientes';
            await channel.assertQueue(queue, { durable: true });

            console.log(`Esperando mensajes en la cola: ${queue}`);

            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    const content = JSON.parse(msg.content.toString());
                    
                    console.log('--------------------------------------------');
                    console.log('NUEVO EMAIL PARA ENVIAR:');
                    console.log(`Para: ${content.email}`);
                    console.log(`Asunto: ¡Bienvenido ${content.nombre}!`);
                    console.log(`Cuerpo: Gracias por registrarte. Tu bono de ${content.montoBono} ha sido activado.`);
                    console.log('--------------------------------------------');

                    channel.ack(msg);
                }
            });

            connected = true;
        } catch (error) {
            retries--;
            console.error(`MS Correos: RabbitMQ no listo (${retries} intentos restantes)`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
};