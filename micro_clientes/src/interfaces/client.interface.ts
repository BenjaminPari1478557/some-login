export interface IRegisterClientPayload {
  tipo_documento: 'DNI' | 'CE';
  nro_documento: string;
  nombres: string;
  apellidos: string;
  email:string;
  fecha_nacimiento: string; // ISO date string 
  bono_bienvenida: number;
  token_seguridad: string; // El token de 8 digitos
}