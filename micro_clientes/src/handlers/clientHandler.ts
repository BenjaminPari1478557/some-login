import { Request, ResponseToolkit } from '@hapi/hapi';
import { IRegisterClientPayload } from '../interfaces/client.interface';
import * as clientService from '../services/clientService';

export const createClient = async (request: Request, h: ResponseToolkit) => {
    const payload = request.payload as IRegisterClientPayload;

    try {
        const client = await clientService.registerNewClient(payload);
        
        return h.response({
            success: true,
            message: 'Cliente registrado correctamente',
            data: client
        }).code(201);

    } catch (error: any) {
        if (error.message === 'TOKEN_INVALIDO') {
            return h.response({ 
                success: false, 
                message: 'Token invalido' 
            }).code(401);
        }

        console.error(error);
        return h.response({ 
            success: false, 
            message: 'Error interno' 
        }).code(500);
    }
};