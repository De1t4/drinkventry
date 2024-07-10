import { useEffect, useState } from "react";
import MenuContent from "../../components/header/menuContent";
import {
  fetchDataClients,
  fetchDataProducts,
  fetchDataSupplier,
} from "../../services/fetchData";
import { Link } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";
import { useAuthContext } from "../../context/authContext";

function Number(n: number) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

export default function Dashboard() {
  const { user } = useAuthContext();
  const nameUser =
    user.user.rol_id === 1 ? "Administrador" : `${user.user.nombre}`;
  const [quantities, setQuantities] = useState({
    product: [],
    clients: [],
    supplier: [],
  });

  const data = [
    {
      title: "Clientes",
      count: quantities.clients.length,
      image: "image1.png",
      link: "/dashboard/clients",
    },
    {
      title: "Proveedores",
      count: quantities.supplier.length,
      image: "image2.png",
      link: "/dashboard/provider",
    },
    {
      title: "Productos",
      count: quantities.product.length,
      image: "image3.png",
      link: "/dashboard/products",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setQuantities({
        product: await fetchDataProducts(),
        clients: await fetchDataClients(),
        supplier: await fetchDataSupplier(),
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <main className="">
        <MenuContent>
          <section className="w-full p-8 max-md:p-4 ">
            <h1 className="text-[#344D64] font-bold text-3xl text-center">
              GESTIÓN DE INVENTARIO
            </h1>
            <p className="text-center text-[#344D64] font-semibold">
              ¡Bienvenido {nameUser}! Este es el panel principal del sistema,
              aquí podrás encontrar atajos para acceder a los listados del
              inventario.
            </p>
            <div className="flex justify-around mt-8 max-lg:flex-col gap-x-4 max-lg:items-center">
              <p></p>
              {data.map((data, index) => (
                <Link
                  to={data.link}
                  key={index}
                  className="hover:scale-105 max-md:hover:scale-100 transition-all duration-300 hover:brightness-110 cursor-pointer rounded-lg flex items-center justify-center gap-8 w-80 bg-[#344D64] h-52  max-lg:scale-95 max-md:scale-90">
                  <img src={data.image} width={100} alt="" />
                  <span className="flex flex-col items-center">
                    <p className=" uppercase text-[#fff]  font-semibold ">
                      {data.title}
                    </p>
                    <h1 className=" text-[#fff] text-6xl font-semibold">
                      {Number(data.count)}
                    </h1>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </MenuContent>
      </main>
    </>
  );
}
