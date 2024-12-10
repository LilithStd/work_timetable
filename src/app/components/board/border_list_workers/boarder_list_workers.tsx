'use client'
import { WORKER_LIST } from "@/app/variables/worker_list"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import Border_list_worker_cell from "./border_list_worker_cell/boarder_list_worker_cell"
import { DAYS_WEEK } from "@/const/const"
import useStore from "@/app/store/hook/useStoreHook"
import dayjs from "dayjs"
import { useWorkerStore } from "@/app/store/workers_store"
import { User } from "@/const/types"



type Border_List_Workers_Props = {
  name?: string,
  update?: boolean
}
export default function Border_List_Workers({ name, update }: Border_List_Workers_Props) {

  const Workers_List = WORKER_LIST
  const border_list_Worker = DAYS_WEEK


  const [enterDraggbleArea, setEnterDraggbleArea] = useState(false)
  const [currentCell, setCurrentCell] = useState('')
  const [currentWorker, setCurrentWorker] = useState('')
  const [eventDropItem, setEventDropItem] = useState('')
  const { daysCell, updateDaysCellsData } = useWorkerStore();

  const handleDragStart = (e: React.DragEvent<HTMLSpanElement>) => {
    e.dataTransfer.setData('worker', e.currentTarget.id);
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('worker');
    const cellData = e.currentTarget.id;
    updateDaysCellsData(cellData, data)
    setCurrentCell('')
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

  };



  const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   fetch('/api/users')
  //     .then((response) => response.json())
  //     .then((data: User[]) => setUsers(data))
  //     .catch((error) => console.error('Ошибка при получении данных:', error));
  // }, []);

  // console.log(users)

  return (
    <>
      <div className={`grid grid-cols-7 grid-rows-1  col-start-2 col-end-9 `}>
        {border_list_Worker.map((item) =>
          <div className={`border-2 text-center ${currentCell === item.id ? 'bg-purple-500' : ''}`}
            key={nanoid()}
            id={item.day}
            onDragEnter={() => setCurrentCell(item.id)}
            onDragLeave={() => setCurrentCell('')}
            onDragOver={handleDragOver}
            onDrop={handleDragDrop}
          ><Border_list_worker_cell
              day={item.day}
            /></div>)}
      </div >
      <div className="grid grid-cols-1 grid-row-4 row-start-1 m-4 gap-2">
        {Workers_List.map((item) =>
          <span className="border-2 text-center hover:cursor-pointer"
            key={nanoid()}
            draggable
            id={item.name}
            onDragStart={handleDragStart}
          >{item.name}</span>)}
      </div>
    </>

  )
}
