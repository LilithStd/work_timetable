'use client'

import { useWorkerStore } from "@/app/store/workers_store"
import { nanoid } from "nanoid"
import { useState } from "react"

type DataTypes = {
    id: string,
    name: string
}

type Edit_Modal_Window_Props = {
    show: boolean,
    close: () => void,
    id: string,
    day: string
}

export default function Worker_Edit_Modal_Window({ id, day, show, close }: Edit_Modal_Window_Props) {
    const { workersByDays } = useWorkerStore()
    const Worker_List = workersByDays(day)
    if (!show) {
        return null
    }

    return (
        <div className="fixed w-56 h-60 bg-white grid grid-cols-2 grid-rows-3">
            <div className="flex flex-col">
                {Worker_List.map((item) => <span key={nanoid()}>{item.name}</span>)}
            </div>
            <button
                className="border-2 w-8 h-8 hover:bg-red-600 justify-items-end"
                onClick={close}
            >X</button>
        </div>
    );
}
