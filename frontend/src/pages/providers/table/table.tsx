import { useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import TableRow from "./tableRow";
import ManageProviders from "../../../components/manageProviders";
import { IProvider } from "../../../interface/interface";

interface Props {
  data: IProvider[] | null;
  openModal: (provider: IProvider) => void;
  openModalDelete: (provider: IProvider) => void;
  searchName: (search: string) => void;
}

function Table({ data, openModal, openModalDelete, searchName }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  if (!data) return;

  const productosPorPagina = 5;
  const inicio = (currentPage - 1) * productosPorPagina;
  const fin = currentPage * productosPorPagina;
  const totalPaginas = Math.ceil(data.length / productosPorPagina);

  const beforeProduct = () => {
    if (currentPage <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextProduct = () => {
    if (currentPage < totalPaginas) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <ManageProviders handleSearchName={searchName} />
      <table className=" w-full table-auto border-2">
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
            <th className="p-2 text-sm font-semibold tracking-wide ">Editar</th>
            <th className="p-2 text-sm font-semibold tracking-wide ">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody className="">
          {data.slice(inicio, fin).map((data, index) => (
            <tr
              key={data.id}
              className={`${
                index % 2 == 0 ? "bg-gray-100" : "bg-gray-200"
              } border-black`}>
              <TableRow
                data={data}
                openModal={openModal}
                openModalDelete={openModalDelete}
              />
            </tr>
          ))}
        </tbody>
      </table>

      {data.length == 0 ? (
        <div className="flex justify-center items-center flex-col">
          <img src={"../notfound.png"} alt="image-not-found" width={300} />
          <p className="text-center font-bold text-xl">
            Proveedor No encontrado
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
  );
}

export default Table;
