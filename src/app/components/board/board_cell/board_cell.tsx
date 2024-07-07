import Worker from "../../worker/worker"
import Client from "../../client/client"

type Board_Cell = {
    worker?: string,
    client?: string
}

export default function Board_Cell({ worker, client }: Board_Cell) {
    return (
        <div className="grid grid-cols-2 grid-rows-3">
            <div className="grid row-start-1 row-end-4 divide-y">
                <div className="hover:bg-orange-500 ">
                    <Client />
                </div>
                <div className="hover:bg-orange-500 ">
                    <Client />
                </div>
                <div className="hover:bg-orange-500 ">
                    <Client />
                </div>
            </div>
            <div className="grid row-start-1 row-end-4 gap-2 divide-y">
                <div className="hover:bg-violet-700 divide-y divide-x grid gap-1">
                    <Worker />
                    <Worker />
                </div>
                <div className="hover:bg-violet-700 divide-y divide-x grid gap-1">
                    <Worker />
                    <Worker />
                </div>
                <div className="hover:bg-violet-700 divide-y divide-x grid gap-1">
                    <Worker />
                    <Worker />
                </div>
            </div>
        </div>
    )
}
