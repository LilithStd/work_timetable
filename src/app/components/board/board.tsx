
import Client from "@/app/components/client/client";
import Worker from "@/app/components/worker/worker";
import Board_Cell from "./board_cell/board_cell";
import Border_List_Workers from "./border_list_workers/boarder_list_workers";
import { WORKER_LIST } from "@/app/variables/worker_list";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DAYS_WEEK, TIME_TO_CLIENT } from "@/const/const";
import WeekAndDays from "./week_and_days/week_and_days";
import { useClientStore } from "@/app/store/client_store";
import { User } from "@/const/types";

const dataNow = dayjs()
const month = dataNow.format('MMMM')
const year = dataNow.format('YYYY')
const data = dataNow.format('D')
const day = dataNow.format('dddd')


const time = ['10:00', '11:00', '12:00', '14:00']
const days_week_cell = new Array(4).fill(null)


export default function Board() {
    // const { clientByDay, loadingDB, getDataDB } = useClientStore()
    // useEffect(() => {
    //     // getDataDB()
    //     console.log(clientByDay)
    // }, [getDataDB])
    // const [users, setUsers] = useState<User[]>([]);

    // useEffect(() => {
    //     fetch('/api/users')
    //         .then((response) => response.json())
    //         .then((data: User[]) => setUsers(data))
    //         .catch((error) => console.error('Ошибка при получении данных:', error));
    // }, []);

    return (
        <div className="bg-slate-600 grid grid-cols-8 grid-rows-[1fr_0.2fr_1fr_1fr_1fr_1fr] justify-center ">
            <Border_List_Workers />
            <WeekAndDays />
            <aside className="grid grid-cols-1 row-start-3 row-end-7 gap-2 divide-y items-center">
                {TIME_TO_CLIENT.map((item) => <div className="m-6 p-6 text-center border-2 divide-x-2 divide-y-2" key={nanoid()}>{item}</div>)}
            </aside>
            <div className="grid grid-cols-7 grid-rows-4 col-start-2 col-end-9 row-start-3 row-end-7 divide-x divide-y">
                {DAYS_WEEK.map((item) =>
                    <div className="grid  divide-x divide-y grid-col-1 grid-row-4 row-start-1 row-end-5" key={nanoid()}>{
                        days_week_cell.map((_, index) => (
                            <div className="text-center hover:bg-sky-700 grid grid-cols-1 grid-row-4 " key={nanoid()}>
                                <Board_Cell
                                    day={item.day}
                                    id={nanoid()}
                                    time={item.TIME_TO_CLIENT[index % time.length]}
                                />
                            </div>
                        ))
                    }

                    </div>

                )}
            </div>
        </div>
    )
}
