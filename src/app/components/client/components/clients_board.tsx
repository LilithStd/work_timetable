'use client'
import { useClientStore } from "@/app/store/client_store"
import { User } from "@/const/types"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

type Client_Board = {
  clients: React.ReactNode[]
}

export default function Clients_board({ clients }: Client_Board) {

  const clientData = clients ? clients : []
  // console.log(clients)
  return (
    clientData.map((item) =>
      <div
        className="hover:bg-orange-500 grid min-h-14 items-center"
        key={nanoid()}
      >
        {item}
      </div>)
  )
}
