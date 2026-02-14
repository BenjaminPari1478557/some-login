import axios from 'axios';

const SECURITY_SERVICE_URL = process.env.SECURITY_SERVICE_URL || 'http://micro-seguridad:3000';

export const validateToken = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${SECURITY_SERVICE_URL}/validate-token`, { token });
        return response.data.valid;
    } catch (error) {
        console.error('Error comunicándose con MS Seguridad:', error);
        return false;
    }
};