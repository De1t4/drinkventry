class CreateUserDto {
  nombre: string;
  contrasena: string;
  email: string;
  rol_id: number;

  constructor(nombre: string, contrasena: string, email: string, rol_id: number) {
    this.nombre = nombre;
    this.contrasena = contrasena;
    this.email = email;
    this.rol_id = rol_id
  }
}

export { CreateUserDto };
