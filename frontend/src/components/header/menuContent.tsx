import { useState } from "react"
import Header from "./header"
import NavIcons from "./navIcons"
import NavAside from "./nav"


export default function MenuContent({children}:any) {

  const [openNav, setOpenNav] = useState<boolean>(false)

  const stateNav = () =>{
    setOpenNav(!openNav)
  }

  return (
    <>
    <main className=''>
      <Header stateNav={stateNav}/>
      <div className="w-auto flex ">
          {openNav
          ?<NavAside/>
          :<NavIcons/>
          }
        {
          children
        }
      </div>
    </main>
    </>
  )
}