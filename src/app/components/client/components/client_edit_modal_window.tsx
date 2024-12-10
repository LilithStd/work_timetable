'use client'

import { useClientStore } from "@/app/store/client_store"
import { DATA_BASE_ACTIONS } from "@/const/baseActions"
import { CLIENT_DATA_STATUS, DAYS, DAYS_WEEK, TIME_TO_CLIENT, TIME_TO_CLIENT_PER_DAY } from "@/const/const"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

type DataTypes = {
    id: string,
    name: string
}

type Edit_Modal_Window_Props = {
    show: boolean,
    day: string,
    time: string,
    close: () => void,
    name: (props: string) => void,
    id: string
}

export default function Client_Edit_Modal_Window({ time, id, day, show, close, name }: Edit_Modal_Window_Props) {
    const { sendDataToDB, clientName, searchViewClient, updateClientByDaysData, checkClientData, clientByDay, setClientName, setClientData } = useClientStore()
    // const [editClientName, setEditClientName] = useState(clientName.name || '')
    const [editClientName, setEditClientName] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        if (searchViewClient(id, day, time)) {
            setEditClientName(searchViewClient(id, day, time));
        }
    }, [day, id, searchViewClient, time]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditClientName(event.target.value);
    };

    const submitHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (editClientName === '') {
            setEditClientName('')
            close()
        } else {
            if (checkClientData(id, editClientName, day)) {
                setClientName({ id: id, name: editClientName })
                name(editClientName)
                setClientData(id, day, CLIENT_DATA_STATUS.CHECK_CLIENT_DATA, { timeToClient: { id: '58ElfngPGzm5YcXYY6Gl3', time: time, name: editClientName } })
                // setClientData(id, day, CLIENT_DATA_STATUS.CHECK_CLIENT_DATA, { timeToClient: { id: id, time: time, name: editClientName } })
                // setClientData(id, day, CLIENT_DATA_STATUS.UPDATE_CLIENT_DATA, { timeToClient: { id: id, time: time, name: editClientName } })
                setEditClientName('')
                close()
            } else {
                setClientName({ id: id, name: editClientName })
                setClientData(id, day, CLIENT_DATA_STATUS.ADD_CLIENT_DATA, { timeToClient: { id: id, time: time, name: editClientName } })
                name(editClientName)
                setEditClientName('')
                close()
            }
        }

    };
    if (!show) {
        return null
    }

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
