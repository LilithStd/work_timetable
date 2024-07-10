
import Client from "@/app/components/client/client";
import Worker from "@/app/components/worker/worker";
import Board_Cell from "./board_cell/board_cell";
import Border_List_Workers from "./border_list_workers/border_list_workers";
import { WORKER_LIST } from "@/app/variables/worker_list";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { useState } from "react";
import { DAYS_WEEK } from "@/const/const";

const dataNow = dayjs()
const month = dataNow.format('MMMM')
const data = dataNow.format('D')
const day = dataNow.format('dddd')

const border_Cell = new Array(28).fill(<Board_Cell />)
const time = ['10:00', '11:00', '12:00', '14:00']


export default function Board() {


    return (
        <div className="bg-slate-600 grid grid-cols-8 grid-rows-[1fr_0.2fr_1fr_1fr_1fr_1fr] justify-center ">
            <Border_List_Workers />
            <div className="grid grid-cols-7 grid-rows-1 col-start-2 col-end-9 row-start-2 row-end-2 justify-items-stretch align-baseline place-items-stretch">
                {DAYS_WEEK.map((item) => <div className={`border-4 text-center h-fit grid ${day === item.day ? 'bg-yellow-500' : ''}`} key={nanoid()}>{item.day}<span>{item.data}</span></div>)}
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
