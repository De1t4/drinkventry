import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { DataProduct } from '../../interface/interface';
import { TableRowProduct } from './tableRowProduct';
import { ModalDelete } from '../../ui/modalDelete';
import { toast } from 'sonner';
import { ModalEditProduct } from '../../ui/modalEditProduct';
import { fetchDataProducts } from '../../services/fetchData';
import ManageProducts from '../manageProducts/manageProducts';
import { ClimbingBoxLoader } from 'react-spinners';

export default function TableProduct({createProduct}:any) {
  const [products, setProducts] = useState<DataProduct[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditsModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState<number>(1)
  const [dataProduct, setDataProduct] = useState<DataProduct>()
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    fetchProduct()
  },[])

  const fetchProduct = async () =>{
    const res = await fetchDataProducts()
    setProducts(res)
    setLoading(false)
  } 

  /* CALCULO PARA LAS TABLAS */
  const productosPorPagina = 5;
  const inicio = (currentPage - 1) * productosPorPagina;
  const fin = currentPage * productosPorPagina;
  const totalPaginas = Math.ceil(products.length / productosPorPagina);

  const beforeProduct = () =>{
    if(currentPage <= 1 ){
      setCurrentPage(1)
    }else{
      setCurrentPage(currentPage - 1)
    }

  }
  const nextProduct = () =>{
    if (currentPage < totalPaginas) {
      setCurrentPage(currentPage + 1);
    }
  }

  const deletePost = async () =>{
    try{
      await axios.delete(`https://inventario-nocontry-s12-23.onrender.com/api/products/${idProduct}`)
      toast.success("El producto fue eliminado con exito")
      setIsModalOpen(false)

      fetchProduct()
    }catch{
      toast.warning("Sucedio un error vuelve a intentarlo")
    }
  }

  const closeModal = () =>{
    setIsModalOpen(false)
  }

  const openModal = (product: DataProduct) =>{ 
    setIsModalOpen(true);
    setIdProduct(product.producto_id)
  }  
  const openModalEdit = async (product: DataProduct) =>{
    setDataProduct(product)

    setEditsModalOpen(true);
  }

  const closeModalEdit = () =>{
    setEditsModalOpen(false)
  }

  const updateTable = () =>{
    fetchProduct()
    setEditsModalOpen(false)
  }

  
  const searchProduct = (product: string) => {
    if (product !== "") {
      const nombreLowerCase = product.toLowerCase();
      const resultados: DataProduct[] = products.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(nombreLowerCase)
      );
      setProducts(resultados);
    } else {
      fetchProduct();
    }
  };

  return (
    <>
    {loading == true 
    ?<ClimbingBoxLoader loading={true}size={40}aria-label="Loading Spinner"
    data-testid="loader" color="#344D64" className="max-md:mt-20 flex justify-center m-auto text-4xl"/>
    :<>
    <ManageProducts createProduct={createProduct} searchDataProduct={searchProduct}/>

    {products.length == 0 
    ? 
              <div className="flex justify-center items-center flex-col">
              <img src={"../notfound.png"} alt="image-not-found" width={300} />
              <p className="text-center font-bold text-xl">
                Producto No encontrado
              </p>
            </div>
    :    <table className="w-full table-auto border-2 rounded-lg">
    <thead className='bg-zinc-50 border-b-2 border-zinc-200'>
      <tr>
        <th className="p-2 text-sm font-semibold tracking-wide text-left">Nombre</th>
        <th className="p-2 text-sm font-semibold tracking-wide text-left">Precio</th>
        <th className="p-2 text-sm font-semibold tracking-wide text-left">Stock</th>
        <th className="p-2 text-sm font-semibold tracking-wide text-left">Categoria</th>
        <th className='p-2 text-sm font-semibold tracking-wide '>Editar</th>
        <th className='p-2 text-sm font-semibold tracking-wide '>Eliminar</th>
      </tr>
    </thead>
    <tbody className="">
      {products.slice(inicio,fin).map((bebida, index)=>(
          <tr className={`${index % 2 == 0 ? "bg-gray-100" : "bg-gray-200"}`} key={index}>
            <TableRowProduct
            data={bebida}
            openModalDelete={openModal}
            openModalEdit={openModalEdit}
            />
          </tr>
        ))     
      }
      </tbody>  
  </table> 
    }
    <div className='bg-zinc-50 border-2 border-zinc-200 text-center flex items-center justify-center text-xl gap-8 bottom-4'>
      <MdKeyboardDoubleArrowLeft onClick={beforeProduct} className="cursor-pointer"/>
      {Array.from({ length: totalPaginas }, (_, index) => (
          <p
            key={index}
            className={`cursor-pointer ${currentPage === index + 1 ? "font-bold" : ""} text-sm font-semibold tracking-wide `}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </p>
        ))}
      <MdKeyboardDoubleArrowRight className="cursor-pointer" onClick={nextProduct}/>
    </div>
    <ModalDelete deletePost={deletePost} stateModal={isModalOpen} closeModal={closeModal} title='Producto'></ModalDelete>
    <ModalEditProduct 
    dataProduct={dataProduct} 
    stateEditModal={editModalOpen} 
    closeModal={closeModalEdit} 
    updateTable={updateTable}
    /></>}
    </>
  )
}

