import { TbSearch } from "react-icons/tb";

export default function ManageProducts({createProduct,searchDataProduct}:any) {

  
  return (
    <section className='w-full flex flex-col gap-4 bg-black bg-opacity-80 px-4 py-4 md:px-12 lg:rounded-lg'>
      <h3 className='font-bold text-3xl text-[#F5F1EA] max-md:text-center'>Gestión de Productos</h3>
      <div className='flex items-center justify-between max-md:flex-col'>
        <div className='flex flex-col gap-2 w-60 lg:flex-row lg:w-auto'>
          <div className='flex items-center rounded-lg justify-around border bg-white border-gray-300 p-1 w-full md:w-60'>
            <input
              className='outline-none py-1 '
              type="text"
              placeholder='Buscar Producto'
              onChange={(e)=> searchDataProduct(e.target.value)}
            />
            <div className=''>
              <TbSearch className='text-gray-800 text-xl' />
            </div>
          </div>
        </div>
        <div>
          <button className='bg-[#354762] text-[#FFFDFD] w-60 py-2 rounded-lg max-md:mt-2' onClick={createProduct}>Agregar Producto</button>
        </div>
      </div>
    </section>
  )
}
