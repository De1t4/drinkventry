import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export default function Header({ stateNav }: any) {
  const { user } = useAuthContext();
  const name = user.user.nombre;

  return (
    <>
      <header className="flex text-[#fff] bg-[#344D64] h-[10vh] items-center justify-between p-4">
        <div className="flex gap-4">
          <button onClick={stateNav}>
            <GiHamburgerMenu className="text-3xl cursor-pointer" />
          </button>
          <Link to={"/dashboard"}>
            <h1 className="text-3xl">DrinkVentory</h1>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-xl font-semibold capitalize">Bienvenido {name}</p>
        </div>
      </header>
    </>
  );
}
