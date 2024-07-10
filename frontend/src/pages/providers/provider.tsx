import { useEffect, useState } from "react";
import MenuContent from "../../components/header/menuContent";
import axios from "axios";
import Table from "./table/table";
import Modal from "../../ui/modal";
import { Toaster, toast } from "sonner";
import { ClimbingBoxLoader } from "react-spinners";
import { ModalDelete } from "../../ui/modalDelete";
import { IProvider } from "../../interface/interface";

export type FormEvents = {
  change: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
  submit: React.FormEvent<HTMLFormElement>;
};

export default function Provider() {
  const initialFormEdit: IProvider = {
    id: 0,
    nombre: "",
    direccion: "",
    telefono: "",
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
  const [edit, setEdit] = useState(initialFormEdit);
  const [idProvider, setIdProvider] = useState<number | undefined>(0);
  const [dataProviders, setDataProviders] = useState<IProvider[] | null>(null);

  const openModal = (provider: IProvider): void => {
    setIsModalOpen(true);
    setEdit(provider);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalDelete = (provider: IProvider): void => {
    setIsModalOpenDelete(true);
    const ID = provider.id;

    setIdProvider(ID);
  };

  const closeModalDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleChangeInput = (e: FormEvents["change"]): void => {
    const { name, value } = e.target;

    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvents["submit"]): void => {
    e.preventDefault();

    const ID = edit.id;

    const editProvider = {
      nombre: edit.nombre,
      direccion: edit.direccion,
      telefono: edit.telefono,
    };

    updateProvider(editProvider);

    async function updateProvider(provider: IProvider): Promise<void> {
      const URL = `https://inventario-nocontry-s12-23.onrender.com/api/supplier/${ID}`;
      try {
        const response = await axios.put(URL, provider);

        if (response.status === 200) {
          toast.success("Proveedor editado");
          closeModal();
        }
      } catch (error) {
        console.log(error);
      }finally{
        
      }
    }
  };

  async function deleteProvider(): Promise<void> {
    const URL = `https://inventario-nocontry-s12-23.onrender.com/api/supplier/${idProvider}`;

    try {
      await axios.delete(URL);
      toast.success("Proveedor eliminado");
      closeModalDelete();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProviders();
  }, []);

  const getProviders = async () => {
    const URL = "https://inventario-nocontry-s12-23.onrender.com/api/supplier";
    try {
      const response = await axios.get(URL);

      setDataProviders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchName = (inputSearch: string) => {
    if (inputSearch != "") {
      const nombreLowerCase = inputSearch.toLowerCase();
      const resultados: IProvider[] | null =
        dataProviders?.filter(
          (persona) =>
            persona.nombre.toLowerCase().includes(nombreLowerCase) ||
            persona.direccion.toLowerCase().includes(nombreLowerCase)
        ) ?? null;
      setDataProviders(resultados);
      console.log(resultados);
    } else {
      getProviders();
    }
  };

  return (
    <MenuContent>
      <section className=" bg-gray-100 w-full h-auto mb-8  p-0  lg:pt-4 lg:px-12 flex flex-col gap-8 ">
        {dataProviders == null && (
          <ClimbingBoxLoader
            loading={true}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="#344D64"
            className="max-md:mt-20 flex justify-center m-auto text-4xl"
          />
        )}
        <Table
          data={dataProviders}
          openModal={openModal}
          openModalDelete={openModalDelete}
          searchName={searchName}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Editar Proveedor
          </h2>
          <p className="text-center">¡Listo! Ahora puedes editar</p>
          <form className="flex flex-col gap-9" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Nombre</label>
              <input
                name="nombre"
                type="text"
                className="rounded-lg text-black font-medium px-2 py-1"
                value={edit.nombre}
                onChange={handleChangeInput}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Dirección</label>
              <input
                name="direccion"
                type="text"
                className="rounded-lg text-black font-medium px-2 py-1"
                value={edit.direccion}
                onChange={handleChangeInput}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Teléfono</label>
              <input
                name="telefono"
                type="tel"
                className="rounded-lg text-black font-medium px-2 py-1"
                value={edit.telefono}
                onChange={handleChangeInput}
              />
            </div>
            <input
              type="submit"
              value="Editar"
              className="h-10 py-1 rounded-lg cursor-pointer border border-text_white border-t-0  bg-primary text-text_white"
            />
          </form>
        </Modal>
        <ModalDelete
          stateModal={isModalOpenDelete}
          closeModal={closeModalDelete}
          deletePost={deleteProvider}
          title="Proveedores"
        />

        <Toaster richColors position="bottom-right" />
      </section>
    </MenuContent>
  );
}
