'use client'
import { useClientStore } from "@/app/store/client_store"
import { User } from "@/const/types"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

type Client_Board = {
  clients: React.ReactNode[]
}

export default function Clients_board({ clients }: Client_Board) {
  // const { clientByDay, loadingDB, getDataDB } = useClientStore()
  // useEffect(() => {
  //   getDataDB()
  // }, [])
  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error('Ошибка при получении данных:', error));
  }, []);

  const [users, setUsers] = useState<User[]>([]);
  const clientData = clients ? clients : []
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
