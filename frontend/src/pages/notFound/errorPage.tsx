import { Link } from "react-router-dom";
import imgError from "/error404.svg";

export default function ErrorPage() {
  return (
    <main className="min-h-screen m-auto bg-third lg:w-screen lg:flex lg:flex-col lg:justify-center">
      <h1 className="h-[100px] font-poppins grid place-content-center text-5xl text-text_white bg-primary">
        Página no encontrada
      </h1>

      <section className="lg:flex">
        <article className="h-[700px] grid place-content-center bg-text_blue bg-opacity-80 lg:w-full">
          <picture className="relative">
            <img
              src={imgError}
              alt="imagen error"
              className="w-[410px] h-[410px]"
            />
            <p className="w-20 font-poppins font-medium text-4xl absolute top-52 left-56 text-text_blue">
              Error 404
            </p>
          </picture>
          <Link to={"/home"} className="grid place-content-center">
            <button className="w-[250px] h-[40px] m-auto mt-5 rounded-lg border border-text_white border-t-0  bg-primary text-text_white">
              Regresar al Dashoboard
            </button>
          </Link>
        </article>
      </section>
    </main>
  );
}
