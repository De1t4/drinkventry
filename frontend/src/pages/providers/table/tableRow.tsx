import { TbEdit, TbTrash } from "react-icons/tb";
import { IProvider } from "../../../interface/interface";
import { useAuthContext } from "../../../context/authContext";
import { toast } from "sonner";

interface TableRowProps {
  data: IProvider;
  openModal: (provider: IProvider) => void;
  openModalDelete: (provider: IProvider) => void;
}

function TableRow({ data, openModal, openModalDelete }: TableRowProps) {
  const { user } = useAuthContext();

  const handleMessage = () => {
    toast.warning("No tienes permiso para hacer esta acción");
  };
  return (
    <>
      <td className="p-2 text-sm text-gray-700">
        <div className="flex items-center gap-[2px] sm:gap-1 lg:gap-2">
          <div>
            <div>{data.nombre}</div>
          </div>
        </div>
      </td>
      <td className="p-2 text-sm text-gray-700">{data.direccion}</td>
      <td className="p-2 text-sm text-gray-700">{data.telefono}</td>
      <td className="flex justify-center mt-2">
        {user.user.rol_id === 1 ? (
          <TbEdit
            className="cursor-pointer text-3xl border-2 bg-blue-100 rounded-lg text-blue-800 p-1 hover:brightness-90 transition-all duration-200"
            onClick={() => openModal(data)}
          />
        ) : (
          <TbEdit
            className="cursor-pointer text-3xl border-2 bg-blue-100 rounded-lg text-blue-800 p-1 hover:brightness-90 transition-all duration-200"
            onClick={handleMessage}
          />
        )}
      </td>
      <td className="p-2 text-sm text-gray-700">
        <div className="flex justify-center items-center">
          {user.user.rol_id === 1 ? (
            <TbTrash
              className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200"
              onClick={() => openModalDelete(data)}
            />
          ) : (
            <TbTrash
              className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200"
              onClick={handleMessage}
            />
          )}
        </div>
      </td>
    </>
  );
}

export default TableRow;
