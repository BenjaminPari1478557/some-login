import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import * as securityService from '../services/securityService';

export const generateToken = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {
    const newToken = await securityService.createToken();
    
    return h.response({
      success: true,
      token: (newToken as any).token_value
    }).code(201);

  } catch (error) {
    console.error(error);
    return h.response({ success: false, message: 'Error al generar token' }).code(500);
  }
};

export const validateToken = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {
    const { token } = request.payload as { token: string };
    
    const isValid = await securityService.verifyToken(token);

    if (isValid) {
      return h.response({ valid: true, message: 'Token auténtico' }).code(200);
    } else {
      return h.response({ valid: false, message: 'Token inválido o ya utilizado' }).code(401);
    }

  } catch (error) {
    return h.response({ valid: false, message: 'Error en la validación' }).code(500);
  }
};
