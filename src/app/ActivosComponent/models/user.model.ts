export interface UserModel {
    idUsuario: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    password: string;
    correo: string;
    estado: boolean;
    telefono: string;
    rolId: number;
}

export interface UserStringModel {
    idUsuario: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    password: string;
    correo: string;
    estado: boolean;
    telefono: string;
    rolId: number;
    rolIdstring: string;
}

export interface LoginModel {    
    correo: string;
    password: string;
}