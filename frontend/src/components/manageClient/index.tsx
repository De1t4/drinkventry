import { TbSearch } from "react-icons/tb";
import { useState } from "react";
import { EventsForm } from "../manageProviders";
import { toast } from "sonner";
import axios from "axios";
import Modal from "../../ui/modal";
import { newClient } from "../../interface/interface";

function ManageClient({ searchClient }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const initialFormProvider: newClient = {
    name: "",
    address: "",
    phone: "",
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

    if (!form.name || !form.address || !form.phone) {
      return toast.error("Los campos no pueden ir vacios");
    }

    if (form.address.length >= 30) {
      return toast.warning(
        "El campo dirección no puede ser mayor a 30 caracteres"
      );
    }

    newProvider(form);

    async function newProvider(client: newClient): Promise<void> {
      const URL =
        "https://inventario-nocontry-s12-23.onrender.com/api/clients/";
      try {
        await axios.post(URL, client);
        toast.success("Cliente agregado");
        closeModal();
        setForm(initialFormProvider);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section className="w-full flex flex-col gap-4 bg-black bg-opacity-80 px-4 py-4 md:px-12 lg:rounded-lg">
        <h3 className="font-bold text-3xl text-[#F5F1EA] max-md:text-center">
          Gestión de Clientes
        </h3>
        <div className="flex items-center justify-between max-md:flex-col">
          <div className="flex flex-col gap-2 w-60 lg:flex-row lg:w-auto">
            <div className="flex items-center rounded-lg justify-around border bg-white border-gray-300 p-1 w-full md:w-60">
              <input
                className="outline-none py-1 "
                type="text"
                placeholder="Buscar cliente"
                onChange={(e) =>
                  searchClient(e.target.value, e.preventDefault())
                }
              />
              <div className="">
                <TbSearch className="text-gray-800 text-xl" />
              </div>
            </div>
          </div>
          <div>
            <button
              className="bg-[#354762] text-[#FFFDFD] w-60 py-2 rounded-lg max-md:mt-2"
              onClick={openModal}>
              Agregar Clientes
            </button>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4 text-center">Alta de Cliente</h2>
        <p className="text-center">¡Bien! Vamos por buen camino</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            className=" placeholder:text-gray-500 outline-none rounded-md h-8 mb-6 px-2 text-black"
            placeholder="JohnDoe"
            value={form.name}
            onChange={handleChangeInput}
          />
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            name="address"
            type="text"
            className=" placeholder:text-gray-500 outline-none rounded-md h-8 mb-6 px-2 text-black"
            placeholder="White 964"
            value={form.address}
            onChange={handleChangeInput}
          />
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="text"
            className=" placeholder:text-gray-500 outline-none rounded-md h-8 mb-6 px-2 text-black"
            placeholder="110034324"
            value={form.phone}
            onChange={handleChangeInput}
          />
          <input
            type="submit"
            value="Agregar"
            className="py-1 rounded-lg cursor-pointer border border-text_white border-t-0  bg-primary text-text_white"
          />
        </form>
      </Modal>
    </>
  );
}

export default ManageClient;
