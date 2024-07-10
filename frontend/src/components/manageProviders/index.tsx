import { useState } from "react";
import { TbSearch } from "react-icons/tb";
import Modal from "../../ui/modal";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { IProvider } from "../../interface/interface";

export type EventsForm = {
  change: React.ChangeEvent<HTMLInputElement>;
  submit: React.FormEvent<HTMLFormElement>;
};

function ManageClient({handleSearchName}:any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const initialFormProvider: IProvider = {
    nombre: "",
    direccion: "",
    telefono: "",
  };

  const [form, setForm] = useState(initialFormProvider);

  const handleChangeInput = (e: EventsForm["change"]): void => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: EventsForm["submit"]): string | React.ReactNode => {
    e.preventDefault();

    if (!form.nombre || !form.direccion || !form.telefono) {
      return toast.error("Los campos no pueden ir vacios");
    }

    if (form.direccion.length >= 30) {
      return toast.warning(
        "El campo dirección no puede ser mayor a 30 caracteres"
      );
    }

    newProvider(form);

    async function newProvider(provider: IProvider): Promise<void> {
      const URL =
        "https://inventario-nocontry-s12-23.onrender.com/api/supplier/";
      try {
        await axios.post(URL, provider);
        toast.success("Proveedor agregado");
        closeModal();
        setForm(initialFormProvider);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 bg-black bg-opacity-80 px-4 py-4 md:px-12 lg:rounded-lg">
        <h3 className="font-bold text-3xl text-[#F5F1EA] max-md:text-center">
          Gestion de proveedores
        </h3>
        <div className='flex items-center justify-between max-md:flex-col'>
          <div className='flex items-center rounded-lg justify-around border bg-white border-gray-300 p-1 w-full md:w-60'>
              <input
                name="nombre"
                className="outline-none py-1 w-full"
                type="search"
                placeholder="Buscar proveedor"
                onChange={(e)=>handleSearchName(e.target.value, e.preventDefault())}
              />
              <TbSearch className="text-gray-800 text-xl" />
            </div>
          <div>
            <button
             className='bg-[#354762] text-[#FFFDFD] w-60 py-2 rounded-lg max-md:mt-2' 
            onClick={openModal}
              >
              Agregar proveedor
            </button>
          </div>
        </div>

      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Alta de proveedor
        </h2>
        <p className="text-center">¡Bien! Vamos por buen camino</p>
        <form onSubmit={handleSubmit} className="flex flex-col text-gray-800">
          <label className=" text-gray-100 font-bold mt-4" htmlFor="name">Nombre</label>
          <input
            className=" placeholder:text-gray-500 outline-none rounded-md h-8 mb-6 px-2"
            placeholder="JohnDoe"
            id="name"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChangeInput}
            
          />
          <label className=" text-gray-100 font-bold" htmlFor="address">Dirección</label>
          <input
            className=" placeholder:text-gray-500 outline-none rounded-md h-8 mb-6 px-2"
            placeholder="Avenida Frondal 3253"
            id="address"
            name="direccion"
            type="text"
            value={form.direccion}
            onChange={handleChangeInput}
          />
          <label className=" text-gray-100 font-bold" htmlFor="phone">Teléfono</label>
          <input
            className=" placeholder:text-gray-500 outline-none rounded-md h-8 mb-6 px-2"
            placeholder="1193421232"
            id="phone"
            name="telefono"
            type="text"
            value={form.telefono}
            onChange={handleChangeInput}
          />
          <input
            type="submit"
            value="Agregar"
            className="py-1 rounded-lg cursor-pointer border border-text_white border-t-0  bg-primary text-text_white"
          />
        </form>
      </Modal>
      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default ManageClient;
