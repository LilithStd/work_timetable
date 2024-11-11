'use client'

import { useClientStore } from "@/app/store/client_store"
import { DAYS, DAYS_WEEK, TIME_TO_CLIENT, TIME_TO_CLIENT_PER_DAY } from "@/const/const"
import { useEffect, useState } from "react"

type DataTypes = {
    id: string,
    name: string
}

type Edit_Modal_Window_Props = {
    show: boolean,
    day: string,
    time?: string,
    close: () => void,
    id: string
}

export default function Client_Edit_Modal_Window({ time, id, day, show, close }: Edit_Modal_Window_Props) {
    const { sendDataToDB, clientName, updateClientByDaysData, setClientName, setClientData } = useClientStore()
    const [editClientName, setEditClientName] = useState(clientName.name || '')


    useEffect(() => {
        if (clientName.name) {
            setEditClientName(clientName.name);
        }
    }, [clientName.name]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditClientName(event.target.value);
    };

    const submitHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setClientName({ id: id, name: editClientName })

        // sendDataToDB()
        setClientData(id, day, { timeToClient: { time: TIME_TO_CLIENT_PER_DAY.FIRST_TIME, name: editClientName } })
        setEditClientName('')
        close()
    };
    if (!show) {
        return null
    }


    const props = {
        id: '',
        day: DAYS.MONDAY,
        time: TIME_TO_CLIENT,
        clientName: ''
    }


    console.log(time)
    return (
        <div className="fixed w-56 h-60 bg-white grid grid-cols-2 grid-rows-3">
            <label className="grid col-start-1 col-end-2 row-start-2 row-end-2">
                Text input:
                <input
                    type="text"
                    name="clientName"
                    className="bg-orange-800"
                    value={editClientName}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="border-2 w-8 h-8 hover:bg-slate-500"
                    onClick={submitHandler}
                >
                    OK
                </button>
            </label>
            <button
                className="border-2 w-8 h-8 hover:bg-red-600 justify-items-end"
                onClick={close}
            >X</button>
        </div>
    );
}
