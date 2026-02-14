export interface ClientPayload {
  tipo_documento: 'DNI' | 'CE';
  nro_documento: string;
  nombres: string;
  apellidos: string;
  email: string;
  fecha_nacimiento: string;
  bono_bienvenida: string;
  token_seguridad: string;
}