import axios from "axios"
import { Product } from "../interface/interface"
const API_ALL_PRODUCTS = "https://inventario-nocontry-s12-23.onrender.com/api/products"
const API_ALL_CLIENTS = "https://inventario-nocontry-s12-23.onrender.com/api/clients"
const API_ALL_SUPPLIER = "https://inventario-nocontry-s12-23.onrender.com/api/supplier"

/* FUNCIONALIDADES DE LOS PRODUCTOS*/
export const registerProduct = async (dataProduct: Product) =>{
  const API_PRODUCTS = "https://inventario-nocontry-s12-23.onrender.com/api/products"
  try{
    const response = await axios.post(API_PRODUCTS,{
      nombre: dataProduct.name,
      precio: dataProduct.price,
      stock: dataProduct.stock,
      proveedor_id: dataProduct.provider,
      categoria_id: dataProduct.category
    })
    return response.data
  }catch{
    return "error"
  }
}

export const fetchProductOnly = async (idProduct: number) =>{
  try {
    const res = await axios.get(`https://inventario-nocontry-s12-23.onrender.com/api/products/${idProduct}`);
    return res.data
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

export const fetchDataProducts = async () =>{
  try{
    const response = await axios.get(API_ALL_PRODUCTS)
    return response.data
  }catch{
    console.log("error")
  }
}

export const fetchDataClients = async () =>{
  try{
    const response = await axios.get(API_ALL_CLIENTS)
    return response.data
  }catch{
    console.log("error")
  }
}

export const fetchDataSupplier = async () =>{
  try{
    const response = await axios.get(API_ALL_SUPPLIER)
    return response.data
  }catch{
    console.log("error")
  }
}