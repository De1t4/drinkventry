class updateUserDto {
  nombre?: string;
  contrasena?: string;
  confirmContrasena?: string;
  email?: string;

  constructor(nombre: string, contrasena: string, confirmContrasena: string, email: string) {
    this.nombre = nombre;
    this.contrasena = contrasena;
    this.confirmContrasena = confirmContrasena;
    this.email = email;
  }
}

export { updateUserDto };
