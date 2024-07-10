export interface Product {
  name: string
  price: number
  provider: number
  stock: number
  category: number
}

export interface DataProduct {
  producto_id: number
  nombre: string
  precio: string
  stock: number
  proveedor_id: number
  categoria_id: number
}

export interface IProvider {
  id?: number;
  nombre: string;
  direccion: string;
  telefono: string;
}


export interface newClient {
  name: string
  address: string
  phone: string
}

export interface Client {
  id: number
  name: string
  address: string
  phone: string
}

export type drinkCategory = {
  [key: number]: string;
};

export interface StateModal {
  title?: string
  stateModal: boolean
  closeModal: () => void
  deletePost: () => void
}

export interface EditModal {
  stateEditModal: boolean
  dataProduct: DataProduct | undefined
  closeModal: () => void
  updateTable: () => void
}

export interface Clients {
  id: number
  name: string
  address: string
  phone: string
}


export interface Users {
  id: number
  nombre: string
  email: string
  rol_id: number
}
