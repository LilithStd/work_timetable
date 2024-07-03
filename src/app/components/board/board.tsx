import Client from "@/app/components/client/client";
import Worker from "@/app/components/worker/worker";
import Board_Cell from "./board_cell/board_cell";
import Border_List_Workers from "./border_list_workers/border_list_workers";
import { WORKER_LIST } from "@/app/variables/worker_list";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

const dataNow = dayjs()
const month = dataNow.format('MMMM')
const data = dataNow.format('D')

const border_Cell = new Array(28).fill(<Board_Cell />)
const border_Worker = new Array(8)
const Workers_List = WORKER_LIST
const border_list_Worker = new Array(7).fill("Test")
const week = [{ day: 'Monday', data: '1' }, { day: 'Tuesday', data: '2' }, { day: 'Wednesday', data: data }, { day: 'Thursday', data: '4' }, { day: 'Friday', data: '5' }, { day: 'Saturday', data: '6' }, { day: 'Sunday', data: '7' }]
const time = ['10:00', '11:00', '12:00', '14:00']


export default function Board() {

    console.log(month)
    console.log(data)
    console.log(dayjs(dataNow).add(-1, 'day').subtract(1, 'year').year(2024).toString());

    return (
        <div className="bg-slate-600 grid grid-cols-8 grid-rows-[1fr_0.2fr_1fr_1fr_1fr_1fr] justify-center ">
            <div className="grid grid-cols-7 grid-rows-1  col-start-2 col-end-9">
                {border_list_Worker.map((item) => <div className="border-2 text-center" key={nanoid()}>{item}</div>)}
            </div>
            <div className="grid grid-cols-1 grid-row-4 row-start-1">
                {Workers_List.map((item) => <span className="border-2 text-center" key={nanoid()}>{item.name}</span>)}
            </div>
            <div className="grid grid-cols-7 grid-rows-1 col-start-2 col-end-9 row-start-2 row-end-2 justify-items-stretch align-baseline place-items-stretch">
                {week.map((item) => <div className="border-4 text-center h-fit grid" key={nanoid()}>{item.day}<span>{item.data}</span></div>)}
            </div>
            <aside className="grid grid-cols-1 row-start-3 row-end-7 gap-2 border-2">
                {time.map((item) => <div className=" m-6 p-6 border-2 text-center" key={nanoid()}>{item}</div>)}
            </aside>
            <div className="grid grid-cols-7 grid-rows-4 col-start-2 col-end-9 row-start-3 row-end-7 gap-2 divide-x divide-y">
                {border_Cell.map((item) => <div className="text-center border-2 hover:bg-sky-700" key={nanoid()}>{item}</div>)}
            </div>
        </div>
    )
}
