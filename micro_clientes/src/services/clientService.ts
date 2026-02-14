import { Cliente } from '../models';
import { IRegisterClientPayload } from '../interfaces/client.interface';
import * as securityProvider from '../providers/securityProvider';
import redisClient from '../config/redis';
import * as rabbitProvider from '../config/rabbitmq';

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
        email: data.email,
        bono_bienvenida: data.bono_bienvenida
    });

    const shouldSendEmail = await redisClient.get('envio_correos');

    if (shouldSendEmail === 'true') {
        const message = {
            clientId: (newClient as any).id,
            email: data.email,
            nombre: data.nombres,
            montoBono: data.bono_bienvenida,
            fechaRegistro: new Date()
        };

        await rabbitProvider.sendToQueue('cola-registro-clientes',message);
        console.log('Mensaje enviado a la cola');
    } else {
        console.log('Envio de correo desactivado');
    }
    
    return newClient;
};