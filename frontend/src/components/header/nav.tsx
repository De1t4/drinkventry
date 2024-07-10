import { IoExitOutline } from "react-icons/io5";
import { FaUsers, FaUser, FaBoxes } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export default function NavAside() {
  const { logout } = useAuthContext();
  const handleLogout = () => {
    logout();
  };
  const links = [
    {
      to: "/dashboard",
      icon: <MdDashboard className="text-2xl max-md:text-xl" />,
      label: "Dashboard",
    },
    {
      to: "/dashboard/clients",
      icon: <FaUser className="text-2xl max-md:text-xl" />,
      label: "Clientes",
    },
    {
      to: "/dashboard/provider",
      icon: <FaBoxes className="text-2xl max-md:text-xl" />,
      label: "Proveedores",
    },
    {
      to: "/dashboard/products",
      icon: <BsCartFill className="text-2xl max-md:text-xl" />,
      label: "Gestión de Productos",
    },
    {
      to: "/dashboard/users",
      icon: <FaUsers className="text-2xl max-md:text-xl" />,
      label: "Gestión de Usuario",
    },
  ];

  return (
    <aside className="h-[90vh] min-w-max  max-lg:h-auto max-md:absolute z-10">
      <nav className="bg-[#CFE0E5] h-full flex flex-col justify-between">
        <div className={` gap-[1px] flex flex-col`}>
          {links.map((link, index) => (
            <>
              <Link
                className={`${
                  window.location.pathname == link.to
                    ? " text-zinc-950 bg-[#47667e] border-[#CFE0E5]"
                    : ""
                }  transition-all duration-300 h-16 text-sm cursor-pointer hover:brightness-150 px-4 text-[#344D64] font-bold border-2 border-[#344D64] flex items-center justify-left gap-2 max-md:px-3`}
                to={link.to}
                key={index}>
                {link.icon}
                {link.label}
              </Link>
            </>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className=" transition-all duration-300 h-16 text-sm cursor-pointer hover:brightness-150 px-4 text-[#344D64] font-bold border-2 border-[#344D64] flex items-center justify-left gap-2">
          <IoExitOutline className=" rotate-180 text-2xl" />
          Salir
        </button>
      </nav>
    </aside>
  );
}
