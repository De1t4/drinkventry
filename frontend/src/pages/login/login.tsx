import logo from "/img-login.svg";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import { toast } from "sonner";

interface IFormLogin {
  email: string;
  contrasena: string;
}

type FormEvents = {
  change: React.ChangeEvent<HTMLInputElement>;
  submit: React.FormEvent<HTMLFormElement>;
};

export default function Login() {
  const InitialFormLogin: IFormLogin = {
    email: "",
    contrasena: "",
  };

  const { login } = useAuthContext();

  const [formLogin, setFormLogin] = useState(InitialFormLogin);
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const handleChangeInput = (e: FormEvents["change"]): void => {
    const { name, value } = e.target;

    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleSubmit = async (e: FormEvents["submit"]) => {
    e.preventDefault();

    if (!formLogin.email || !formLogin.contrasena) {
      toast.error("Los campos no pueden ir vacios");
      return;
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(formLogin.email)) {
      toast.error("El campo no coincide con un correo valido");
      return;
    }

    const options = {
      method: "POST",
      url: "https://inventario-nocontry-s12-23.onrender.com/api/users/login",
      headers: { Authorization: "Bearer " },
      data: formLogin,
    };

    axios
      .request(options)
      .then(function (response) {
        login(response.data);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Usuario y/o contraseña incorrecta");
      });
  };

  const handleIsVisiblePass = () => {
    setIsVisiblePass(!isVisiblePass);
  };

  return (
    <main className="h-screen overflow-y-hidden  max-w-screen-2xl m-auto lg:flex lg:flex-col lg:justify-center  bg-third">
      <h1 className="h-[100px] font-poppins grid place-content-center text-5xl text-text_white bg-primary">
        DrinkVentory
      </h1>

      <section className="lg:flex bg-primary">
        <article className="hidden lg:w-1/2 lg:grid place-content-center">
          <picture className="w-4/5 m-auto">
            <img src={logo} alt="imagen login" />
          </picture>
        </article>

        <article className="h-[500px] mt-10 mx-auto flex justify-center items-center relative lg:w-1/2 lg:-mt-0 lg:h-[500px]">
          <img
            src={logo}
            alt="imagen login"
            className="w-[140px] h-[140px] absolute -top-14 left-28 lg:hidden"
          />
          <form
            className="w-[550px] h-[470px] font-roboto flex flex-col justify-evenly items-center rounded-lg bg-black bg-opacity-50 lg:w-[450px] lg:h-[450px]"
            onSubmit={handleSubmit}>
            <h2 className="text-4xl font-poppins text-text_white lg:text-3xl">
              ¡Te damos la bienvenida!
            </h2>
            <label htmlFor="email" className="text-text_white relative">
              Correo electrónico
              <input
                id="email"
                type="text"
                name="email"
                placeholder="Ejemplo@gmail.com"
                className="w-[350px] h-[40px] rounded-lg block mt-3 pl-3 text-black"
                value={formLogin.email}
                onChange={handleChangeInput}
              />
              <span
                className="absolute right-2 bottom-2 text-2xl"
                onClick={handleIsVisiblePass}>
                <MdOutlineMailOutline className="text-black" />
              </span>
            </label>
            <label htmlFor="contrasena" className="text-white relative">
              Contraseña
              <input
                id="contrasena"
                type={isVisiblePass ? "text" : "password"}
                name="contrasena"
                placeholder="Contraseña"
                className="w-[350px] h-[40px] rounded-lg block mt-3 pl-3 text-black "
                value={formLogin.contrasena}
                onChange={handleChangeInput}
              />
              <span
                className="absolute right-2 bottom-2 text-2xl"
                onClick={handleIsVisiblePass}>
                {isVisiblePass ? (
                  <BiShow className="text-black" />
                ) : (
                  <AiOutlineEyeInvisible className="text-black" />
                )}
              </span>
            </label>
            <button className="w-[350px] h-[40px] rounded-lg border border-text_white border-t-0 bg-primary text-text_white ">
              Inicia sesión
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
