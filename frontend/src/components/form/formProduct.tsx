import { useState } from "react";
import { Product } from "../../interface/interface";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";
import { registerProduct } from "../../services/fetchData";

export default function FormProduct({ closeForm }: any) {
  const [dataProduct, setDataProduct] = useState<Product>({
    name: "",
    price: 0,
    provider: 1,
    stock: 0,
    category: 1,
  });

  const resetDataProduct = () => {
    setDataProduct({
      ...dataProduct,
      name: "",
      price: 0,
      provider: 1,
      stock: 0,
      category: 1,
    });
  };

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      dataProduct.name == "" ||
      dataProduct.price == 0 ||
      dataProduct.stock == 0
    ) {
      toast.warning("Ingresar datos faltantes");
      console.log(dataProduct);
    } else {
      const res = await registerProduct(dataProduct);
      if (res == "error") {
        toast.warning("Sucedio un error, vuelve a intentarlo");
      } else {
        (e.target as HTMLFormElement).reset();
        resetDataProduct();
        toast.success("El producto fue creado correctamente");
        console.log(res);
      }
    }
  };

  const updateName = (value: React.ChangeEvent<HTMLInputElement>) => {
    setDataProduct({ ...dataProduct, name: value.target.value });
  };

  const updatePrice = (value: React.ChangeEvent<HTMLInputElement>) => {
    setDataProduct({ ...dataProduct, price: Number(value.target.value) });
  };

  const updateProvider = (value: React.ChangeEvent<HTMLSelectElement>) => {
    setDataProduct({ ...dataProduct, provider: Number(value.target.value) });
  };

  const updateStock = (value: React.ChangeEvent<HTMLInputElement>) => {
    setDataProduct({ ...dataProduct, stock: Number(value.target.value) });
  };

  const updateCategory = (value: React.ChangeEvent<HTMLSelectElement>) => {
    setDataProduct({ ...dataProduct, category: Number(value.target.value) });
  };

  return (
    <section className="w-full">
      <h1 className="w-full mb-2 h-12 flex justify-center items-center font-bold text-2xl text-zinc-100 text-center bg-[#000000]">
        Alta de Productos
      </h1>
      <article className="flex justify-around items-center mt-10">
        <form
          className=" border-2 flex flex-col bg-[#65727C] p-6 w-96 rounded-lg"
          onSubmit={createProduct}>
          <FaArrowLeft
            className="text-zinc-100  mb-4 text-xl cursor-pointer "
            onClick={closeForm}
          />

          <label htmlFor="name" className=" font-bold">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            placeholder="Coca Cola 2L"
            onChange={updateName}
            className="h-8 rounded-md px-2 outline-none mt-1"
          />
          <label htmlFor="price" className="mt-4  font-bold">
            Precio
          </label>
          <div className="flex items-center mt-1">
            <span className="text-gray-400 mr-2">$</span>
            <input
              onChange={updatePrice}
              type="number"
              placeholder="1.00"
              className="h-8 rounded-md px-2 outline-none w-full"
            />
          </div>

          <label htmlFor="providers" className="mt-4  font-bold">
            Proveedores
          </label>
          <select
            name="providers"
            onChange={updateProvider}
            id=""
            className="h-8 rounded-md px-2 outline-none mt-1">
            <option value="1">Proveedor 1</option>
            <option value="2">Proveedor 2</option>
            <option value="3">Proveedor 3</option>
          </select>

          <label htmlFor="stock" className="mt-4  font-bold">
            Stock
          </label>
          <input
            type="number"
            onChange={updateStock}
            placeholder="10"
            className="h-8 rounded-md px-2 outline-none mt-1"
          />

          <label htmlFor="category" className="mt-4  font-bold">
            Categoría
          </label>
          <select
            name="category"
            onChange={updateCategory}
            className="h-8 rounded-md px-2 outline-none mt-1">
            <option value="1">Gaseosas</option>
            <option value="2">Aguas</option>
            <option value="3">Jugos</option>
            <option value="4">Cervezas</option>
            <option value="5">Vinos</option>
          </select>

          <button className="bg-[#354762] mt-6 h-10 rounded-lg text-zinc-100 font-bold">
            Agregar
          </button>
        </form>

        <img
          src={"../image-form.png"}
          alt="image-form"
          className="rounded-lg max-md:hidden w-80 h-80"
        />
      </article>
    </section>
  );
}
