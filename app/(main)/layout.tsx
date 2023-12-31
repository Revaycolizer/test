"use client"

// import Menu from "./menu"

import Navbar from "@/components/NavBar/Navbar"
import ClientOnly from "../../components/hydra/Hydra"
import { WithPrivateRoute } from "@/src/utils/privateroute"




function RootLayout({children}
    : {
        children: React.ReactNode
      }){
  return (
    <section>
        <ClientOnly>
        <main><Navbar/>{children}</main></ClientOnly>
    </section>
  )
}

export default WithPrivateRoute(RootLayout)

