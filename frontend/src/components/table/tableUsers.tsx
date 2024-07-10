import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/authContext';
import { Users } from '../../interface/interface';
import TableRowUsers from './tableRowUsers';
import ManageUsers from '../manageUsers/manageUsers';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { ClimbingBoxLoader } from 'react-spinners';

export default function TableUsers() {
  const [users, setUsers] = useState<Users[]>([])
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true)

  const token = user.token 

  useEffect(()=>{
    console.log(token)
    fetchDataUsers()
  },[])

  const fetchDataUsers = async () =>{
    try {
      const res = await axios.get('https://inventario-nocontry-s12-23.onrender.com/api/users/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(res.data)
      setLoading(false)
      console.log(users)
    } catch (error) {
      console.log("Sucedio un error")
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 5;
  const inicio = (currentPage - 1) * productosPorPagina;
  const fin = currentPage * productosPorPagina;
  const totalPaginas = Math.ceil(users.length / productosPorPagina);


  const beforeProduct = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const nextProduct = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPaginas));


  const searchUsers = (dataUser: string) =>{
    if (dataUser !== "") {
      const nombreLowerCase = dataUser.toLowerCase();
      const resultados: Users[] = users.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(nombreLowerCase)
      );
      setUsers(resultados);
    } else {
      fetchDataUsers();
    }
  }

  return (
    <>
    {loading == true ?           <ClimbingBoxLoader
        loading={true}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#344D64"
        className="max-md:mt-20 flex justify-center m-auto text-4xl"
      />:
      <>
      <ManageUsers searchDataUsers={searchUsers}/>
      <table className=" w-full table-auto border-2">
        <thead className="bg-zinc-50 border-b-2 border-zinc-200">
          <tr>
            <th className="p-2 text-sm font-semibold tracking-wide text-left">
              Nombre
            </th>
            <th className="p-2 text-sm font-semibold tracking-wide text-left">
              Dirección
            </th>
            <th className="p-2 text-sm font-semibold tracking-wide ">Editar</th>
            <th className="p-2 text-sm font-semibold tracking-wide ">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody className="">
        {users.slice(inicio, fin).map((element, index) => (
          <tr
            className={`${
              index % 2 == 0 ? "bg-gray-100" : "bg-gray-200"
            }`}
            key={index}>
            <TableRowUsers
              data={element}
            />
          </tr>
          ))}
        </tbody>
      </table>
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
          </>
      
    }

    </>
  )
}
