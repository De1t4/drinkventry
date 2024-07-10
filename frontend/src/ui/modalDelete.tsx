'use client'
import React from 'react'
import { StateModal } from '../interface/interface'
import { IoIosCloseCircleOutline } from "react-icons/io";

export const ModalDelete: React.FC<StateModal>  = ({stateModal, closeModal, deletePost, title}) =>{
  return (
    <div id="loginModal" className={`${stateModal? "block":"hidden"} z-20 h-auto modal fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center`}>
      <div className={`flex flex-col items-center relative h-auto  justify-center transition-all duration-300 w-2/5 max-xl:w-2/4 modal-content bg-[#344D64] shadow-xl shadow-[#344D64] text-white rounded-lg  p-6  max-md:w-4/5 `}>
        <IoIosCloseCircleOutline className=" text-4xl cursor-pointer absolute right-5 top-4" onClick={closeModal}/>
        <h2 className="text-4xl text-center my-6 text-[#f0f3ff] font-bold">Eliminar {title}</h2>
        <p className='text-lg'>¿Estás seguro de que deseas eliminar este {title}? Esta acción no se puede deshacer y resultará en la eliminación permanente del producto de la base de datos. Por favor, confirma tu decisión</p>
        <span className=' flex justify-between gap-2 '>
          <button onClick={deletePost} className='bg-red-300 font-bold border-2 p-2 w-40 mt-8 text-red-500 border-red-500 rounded-lg'>Eliminar</button>
        </span>
      </div>
    </div>  
    )
}