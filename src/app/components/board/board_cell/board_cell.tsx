import Worker from "../../worker/worker"
import Client from "../../client/client"
import { COUNT_CLIENTS_PER_DAY, COUNT_WORKERS_PER_DAY, COUNT_WORKERS_PER_DAYS } from "@/const/const"
import { nanoid } from "nanoid"

type Board_Cell = {
    id: string,
    worker?: string,
    client?: string
}




export default function Board_Cell({ id, worker, client }: Board_Cell) {
    const CLIENTS = new Array(COUNT_CLIENTS_PER_DAY).fill(null).map(() => <Client id={nanoid()} />)
    const WORKER = new Array(COUNT_WORKERS_PER_DAY).fill(<Worker template />)
    const WORKERS = new Array(COUNT_WORKERS_PER_DAYS).fill(WORKER)

    return (
        <div className="grid grid-cols-2 grid-rows-3">
            <div className="grid row-start-1 row-end-4 items-center  divide-y">
                {CLIENTS.map((item) =>
                    <div
                        className="hover:bg-orange-500 grid min-h-14 items-center"
                        key={nanoid()}
                    >
                        {item}
                    </div>)
                }
            </div>
            <div className="grid row-start-1 row-end-4 divide-y items-center">
                {WORKERS.map((item) =>
                    <div className="  divide-x grid gap-y-1 items-center min-h-14">
                        {item}
                    </div>)
                }
            </div>
        </div>
    )
}
