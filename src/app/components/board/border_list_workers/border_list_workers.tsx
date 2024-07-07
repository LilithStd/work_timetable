'use client'
import { WORKER_LIST } from "@/app/variables/worker_list"
import { nanoid } from "nanoid"
import { useState } from "react"
import Border_list_worker_cell from "./border_list_worker_cell/border_list_worker_cell"

type Border_List_Workers_Props = {
  name?: string,
  update?: boolean
}
export default function Border_List_Workers({ name, update }: Border_List_Workers_Props) {
  const Workers_List = WORKER_LIST
  const border_list_Worker = new Array(7).fill(<Border_list_worker_cell />)

  if (update) {

  }
  const [enterDraggbleArea, setEnterDraggbleArea] = useState(false)

  return (
    <>
      <div className={`grid grid-cols-7 grid-rows-1  col-start-2 col-end-9 `}>
        {border_list_Worker.map((item) =>
          <div className={`border-2 text-center ${enterDraggbleArea ? 'bg-purple-500' : ''}`}
            key={nanoid()}
            onDragEnter={() => setEnterDraggbleArea(true)}
            onDragLeave={() => setEnterDraggbleArea(false)}
          >{item}</div>)}
      </div>
      <div className="grid grid-cols-1 grid-row-4 row-start-1 m-4 gap-2">
        {Workers_List.map((item) =>
          <span className="border-2 text-center hover:cursor-pointer"
            key={nanoid()}
            draggable
          >{item.name}</span>)}
      </div>
    </>

  )
}
