import { TbEdit, TbTrash } from 'react-icons/tb'

export default function TableRowUsers({data}:any) {
  return (
    <>
      <td className="p-2 text-sm text-gray-700">{data.nombre}</td>
      <td className="p-2 text-sm text-gray-700">{data.email}</td>
      <td>
        <p className='flex justify-center'><TbEdit className="cursor-pointer text-3xl border-2 bg-blue-100 rounded-lg text-blue-800 p-1 hover:brightness-90 transition-all duration-200" /></p>
      </td>
      <td>
      <p className='flex justify-center'><TbTrash className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200" /></p>

      </td>

    </>
  )
}
