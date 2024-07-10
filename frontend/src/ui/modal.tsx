import React, { ReactNode } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
 if(!isOpen) return isOpen

  return (
    <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm shadow-lg z-10">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-[#344D64] rounded-lg p-6 w-full max-w-md text-[#F5F1EA] px-20">
          <IoIosCloseCircleOutline className=" text-4xl cursor-pointer absolute right-5 top-4" onClick={onClose}/>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
