export interface Paciente{
    _id?: string;
    rut: string;
    nombre: string;
    edad: number;
    sexo: string;
    fotoPersonal: string;
    fechaIngreso: Date;
    enfermedad: string;
    revisado: boolean;
}