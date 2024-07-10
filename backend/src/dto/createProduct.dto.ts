class CreateProductDto {
  nombre: string;
  precio: number;
  stock:number;
  proveedor_id: number;
  categoria_id: number;

    constructor(nombre: string, precio: number, stock:number, proveedor_id: number, categoria_id: number) {
      this.nombre = nombre
      this.precio = precio
      this.stock = stock
      this.proveedor_id = proveedor_id
      this.categoria_id = categoria_id
    }
  }
  
  export { CreateProductDto };
  