import { startMailConsumer } from './config/rabbitmq';

console.log("Microservicio de correos iniciado");

startMailConsumer().catch(err => {
    console.error("Fallo crítico en el consumidor:", err);
    process.exit(1);
});