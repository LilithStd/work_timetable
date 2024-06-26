import Client from "@/app/components/client/client";
import Worker from "@/app/components/worker/worker";

export default function Board() {
    const cell = [1, 2, 3, 4, 5, 6, 7, 8]
    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (

        <div className="bg-slate-600 grid justify-stretch">
            <div className="grid grid-flow-col justify-between">
                {cell.map((item) => <div className="w-10 h-10 bg-red-700" key={item}>{item}</div>)}
                {week.map((item) => <div className="w-20 h-20 border-4 text-center" key={item}>{item}</div>)}
            </div>
        </div>
    )
}
