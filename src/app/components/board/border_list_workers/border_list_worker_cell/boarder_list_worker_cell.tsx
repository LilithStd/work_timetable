'use client'
import { nanoid } from "nanoid"
import { useState, useEffect } from "react";

type Border_list_worker_cell_Props = {
    id: string,
    name?: string
}



export default function Border_list_worker_cell({ id, name }: Border_list_worker_cell_Props) {
    const [workerList, setWorkerList] = useState<string[]>([]);

    useEffect(() => {
        if (name) {
            setWorkerList(prevList => [...prevList, name]);
        }
    }, [name]);

    return (
        <div>
            {workerList.length > 0 ? workerList.map((item) => <span key={nanoid()}>{item}</span>) : 'Default_name'}
        </div>
    )
}
