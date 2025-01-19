import Worker from "../../worker/worker"
import Client from "../../client/client"
import { COUNT_WORKERS_PER_DAY, COUNT_WORKERS_PER_DAYS } from "@/const/const"
import { nanoid } from "nanoid"
import Clients_board from "../../client/components/clients_board"
import { useClientStore } from "@/app/store/client_store"
import { Key } from "react"


type Board_Cell = {
    id: string,
    day: string,
    time: string,
    worker?: string,
    client?: string
}

export default function Board_Cell({ id, time, day, worker, client }: Board_Cell) {
    const clientD = useClientStore(state => state.searchClientData)
    // const temp = clientD(day, time).filter((item) => item.client.flatMap((element) => element.timeToClient.name !== '' ? element.timeToClient.name : ''))
    const temp = clientD(day, time)
    const t = ['1', '2', '3']
    // console.log(t.map((item) => item))
    const placeholder = {
        timeToClient: { id: nanoid(), name: "EDIT", time: "" },
    };

    // Дополняем массив заглушками до нужного размера

    const createClients = () => {
        const MAX_CLIENTS = 3;
        const filledArray = [...temp, ...Array(Math.max(0, MAX_CLIENTS - temp.length)).fill(placeholder)];
        const clientArray = filledArray.map((item, index) => (
            <Client
                id={item.timeToClient.id}
                key={item.timeToClient.id || nanoid()} // Уникальный ключ
                day={day}
                time={item.timeToClient.time || "00:00"} // Значение по умолчанию
                name={item.timeToClient.name}
            />
        ));
        return clientArray;
    };

    // console.log(createClients())
    const CLIENTS = new Array(3).fill(null).map((item) =>

        <Client id={nanoid()} key={nanoid()} day={day} time={time} name={''} />
    )

    const WORKER = new Array(COUNT_WORKERS_PER_DAY).fill(null).map(() =>
        <Worker id={nanoid()} key={nanoid()} day={day} />)
    const WORKERS = new Array(COUNT_WORKERS_PER_DAYS).fill(WORKER)

    return (
        <div className="grid grid-cols-2 grid-rows-3">
            <div className="grid row-start-1 row-end-4 items-center  divide-y">
                <Clients_board clients={createClients()} />
                {/* {CLIENTS.map((item) =>
                    <div
                        className="hover:bg-orange-500 grid min-h-14 items-center"
                        key={nanoid()}
                    >
                        {item}
                    </div>)
                } */}

            </div>
            <div className="grid row-start-1 row-end-4 divide-y items-center">
                {WORKERS.map((item) =>
                    <div className="  divide-x grid gap-y-1 items-center min-h-14"
                        key={nanoid()}
                    >
                        {item}
                    </div>)
                }
            </div>
        </div>
    )
}
