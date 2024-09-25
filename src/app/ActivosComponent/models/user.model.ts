export interface UserModel {
    idUsuario: number;
    nombre: string;
    password: string;
    correo: string;
    estado: boolean;
    telefono: string;
    historialActivos: number;
    rolId: number;
}

export interface LoginModel {    
    correo: string;
    password: string;
}