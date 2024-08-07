'use client'
import { useWorkerStore } from "@/app/store/workers_store";
import { DAYS } from "@/const/const";
import { nanoid } from "nanoid"
import { useState, useEffect } from "react";

type Border_list_worker_cell_Props = {
    day: string,
}



export default function Border_list_worker_cell({ day }: Border_list_worker_cell_Props) {
    const workersByDaysStore = useWorkerStore((state) => state.workersByDays)
    const workersByDays = workersByDaysStore(day)

    return (
        <div>
            {workersByDays && workersByDays.length !== 0 ? workersByDays.map((item) =>
                <div
                    key={nanoid()}
                    className="flex"
                >
                    {item.name}
                </div>

            ) : 'Nothing'}
        </div>
    )
}
