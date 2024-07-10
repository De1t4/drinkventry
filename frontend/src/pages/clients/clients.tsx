import Table from '../../components/table/table'
import MenuContent from '../../components/header/menuContent'
export default function Clients() {

  
  return (
    <>
      <MenuContent>
        <section className="bg-gray-100 w-full h-auto mb-8  p-0  lg:pt-4 lg:px-12 flex flex-col gap-8 ">
          <Table />
        </section>
      </MenuContent>
    </>
  )
}
