import Client from "@/app/components/client/client";
import Worker from "@/app/components/worker/worker";

const cell = [1, 2, 3, 4, 5, 6, 7, 8]
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const time = ['10:00', '11:00', '12:00', '14:00']

export default function Board() {


    return (
        <div className="bg-slate-600 grid grid-cols-8 grid-rows-[1fr_0.2fr_1fr_1fr_1fr_1fr] justify-center ">
            <div className="grid grid-cols-7 grid-rows-1 col-start-2 col-end-9 row-start-2 row-end-2 justify-items-stretch align-baseline place-items-stretch">
                {week.map((item) => <div className="border-4 text-center h-fit" key={item}>{item}</div>)}
            </div>
            <aside className="grid grid-cols-1 row-start-3 row-end-7 gap-2 border-4">
                <div>{time.map((item) => <div className=" m-6 p-6 border-4 text-center" key={item}><span className="" key={item}>{item}</span></div>)}</div>
            </aside>
        </div>
    )
}
