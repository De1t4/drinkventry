import MenuContent from "../../components/header/menuContent";
import TableUsers from "../../components/table/tableUsers";

export default function Users() {
  return (
    <MenuContent>
      <section className="bg-gray-100 w-full h-auto mb-8  p-0  lg:pt-4 lg:px-12 flex flex-col gap-8">
      <TableUsers/>

      </section>
    </MenuContent>
  );
}
