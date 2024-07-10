import { FormEvent, useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import TableRow from "./tableRow";
import ManageClient from "../../components/manageClient";
import Modal from "../../ui/modal";
import { ModalDelete } from "../../ui/modalDelete";
import { fetchDataClients } from "../../services/fetchData";
import { Client, Clients } from "../../interface/interface";
import axios from "axios";
import { toast } from "sonner";
import { FormEvents } from "../../pages/providers/provider";
import { ClimbingBoxLoader } from "react-spinners";

const API_URL = "https://inventario-nocontry-s12-23.onrender.com/api/clients";

function Table() {
  const [dataClients, setDataClients] = useState<Clients[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [idClient, setIdClient] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [dataClient, setDataClient] = useState<Client>({
    id: 0,
    name: "",
    address: "",
    phone: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 5;
  const inicio = (currentPage - 1) * productosPorPagina;
  const fin = currentPage * productosPorPagina;
  const totalPaginas = Math.ceil(dataClients.length / productosPorPagina);

  useEffect(() => {
    fetchInfoClients();
  }, []);

  const fetchInfoClients = async () => {
    await fetchDataClients().then((data) => setDataClients(data));

    setLoading(false);
  };

  const beforeProduct = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const nextProduct = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPaginas));

  const openModal = (client: Client) => {
    setIsModalOpen(true);
    setDataClient(client);
  };

  const closeModal = () => setIsModalOpen(false);

  const openModalDelete = (id: number) => {
    setModalDelete(true);
    setIdClient(id);
  };

  const closeModalDelete = () => setModalDelete(false);

  const deleteClient = async () => {
    try {
      await axios.delete(`${API_URL}/${idClient}`);
      toast.success("El cliente fue eliminado con éxito");
      setModalDelete(false);
      fetchInfoClients();
    } catch {
      toast.warning("Sucedio un error, vuelve a intentarlo");
    }
  };

  const editClientData = async (e: FormEvent) => {
    e.preventDefault();
    console.log(dataClient);
    try {
      await axios.put(`${API_URL}/${dataClient.id}`, {
        name: dataClient.name,
        address: dataClient.address,
        phone: dataClient.phone,
      });
      fetchDataClients().then((data) => setDataClients(data));

      toast.success("El cliente fue modificado");
    } catch {
      toast.warning("Sucedio un error, vuelve a intentarlo");
    }
  };

  const handleChangeInput = (e: FormEvents["change"]): void => {
    const { name, value } = e.target;
    setDataClient({
      ...dataClient,
      [name]: value,
    });
  };

  const searchClient = (client: string) => {
    if (client != "") {
      const nombreLowerCase = client.toLowerCase();
      const resultados: Clients[] | null =
        dataClients.filter(
          (persona) =>
            persona.name.toLowerCase().includes(nombreLowerCase) ||
            persona.address.toLowerCase().includes(nombreLowerCase)
        ) ?? null;
      setDataClients(resultados);
      console.log(resultados);
    } else {
      fetchInfoClients();
    }
  };

  return (
    <>
      {loading == true ? (
        <ClimbingBoxLoader
          loading={true}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
          color="#344D64"
          className="max-md:mt-20 flex justify-center m-auto text-4xl"
        />
      ) : (
        <>
          <ManageClient searchClient={searchClient} />
          <table className="w-full table-auto border-2 rounded-lg">
            <thead className="bg-zinc-50 border-b-2 border-zinc-200">
              <tr>
                <th className="p-2 text-sm font-semibold tracking-wide text-left">
                  Nombre
                </th>
                <th className="p-2 text-sm font-semibold tracking-wide text-left">
                  Dirección
                </th>
                <th className="p-2 text-sm font-semibold tracking-wide text-left">
                  Teléfono
                </th>
                <th className="p-2 text-sm font-semibold tracking-wide ">
                  Editar
                </th>
                <th className="p-2 text-sm font-semibold tracking-wide ">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="">
              {dataClients.slice(inicio, fin).map((element, index) => (
                <tr
                  className={`${
                    index % 2 == 0 ? "bg-gray-100" : "bg-gray-200"
                  }`}
                  key={index}>
                  <TableRow
                    data={element}
                    openModal={openModal}
                    openModalDelete={openModalDelete}
                  />
                </tr>
              ))}
            </tbody>
          </table>
          {dataClients.length == 0 ? (
            <div className="flex justify-center items-center flex-col">
              <img
                src={"../notfound.png"}
                alt="image-not-found"
                width={300}
                className=""
              />
              <p className="text-center font-bold text-xl">
                Cliente No encontrado
              </p>
            </div>
          ) : (
            <div className="bg-zinc-50 border-2 border-zinc-200 text-center flex items-center justify-center text-xl gap-8 bottom-4">
              <MdKeyboardDoubleArrowLeft
                onClick={beforeProduct}
                className="cursor-pointer relative"
              />
              {Array.from({ length: totalPaginas }, (_, index) => (
                <p
                  key={index}
                  className={`cursor-pointer ${
                    currentPage === index + 1 ? "font-bold" : ""
                  } text-sm font-semibold tracking-wide`}
                  onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </p>
              ))}
              <MdKeyboardDoubleArrowRight
                className="cursor-pointer"
                onClick={nextProduct}
              />
            </div>
          )}
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Edición del cliente
        </h2>
        <p className="text-center">¡Bien! Vamos por buen camino</p>
        <form className="flex flex-col gap-9" onSubmit={editClientData}>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Nombre</label>
            <input
              name="name"
              onChange={handleChangeInput}
              defaultValue={dataClient?.name}
              type="text"
              className="outline-1 outline rounded-lg text-black font-medium px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Dirección</label>
            <input
              name="address"
              onChange={handleChangeInput}
              defaultValue={dataClient?.address}
              type="text"
              className="outline-1 outline rounded-lg text-black font-medium px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Teléfono</label>
            <input
              name="phone"
              onChange={handleChangeInput}
              defaultValue={dataClient?.phone}
              type="tel"
              className="outline-1 outline rounded-lg text-black font-medium px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="bg-[#354762] py-1 rounded-lg cursor-pointer border-2 h-10 my-1">
            Guardar Cambios
          </button>
        </form>
      </Modal>

      <ModalDelete
        deletePost={deleteClient}
        stateModal={modalDelete}
        closeModal={closeModalDelete}
        title="Cliente"
      />
    </>
  );
}

export default Table;
