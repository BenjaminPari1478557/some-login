import { Cliente } from '../models';
import { IRegisterClientPayload } from '../interfaces/client.interface';
import * as securityProvider from '../providers/securityProvider';
import redisClient from '../config/redis';

export const registerNewClient = async (data: IRegisterClientPayload) => {
    const isTokenValid = await securityProvider.validateToken(data.token_seguridad);
    
    if (!isTokenValid) {
        throw new Error('TOKEN_INVALIDO');
    }

    const newClient = await Cliente.create({
        tipo_documento: data.tipo_documento,
        nro_documento: data.nro_documento,
        nombres: data.nombres,
        apellidos: data.apellidos,
        fecha_nacimiento: data.fecha_nacimiento,
        bono_bienvenida: data.bono_bienvenida
    });

    const shouldSendEmail = await redisClient.get('envio_correos');

    if (shouldSendEmail === 'true') {
        console.log('Enviando mensaje a RabbitMQ');
        // await rabbitProvider.sendToMailQueue(newClient);
    } else {
        console.log('Envio de correo desactivado');
    }

    return newClient;
};