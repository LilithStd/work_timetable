'use client'

import { useEffect, useState } from "react"
import Edit_Modal_Window from "./components/client_edit_modal_window"
import { useClientStore } from "@/app/store/client_store"
import { nanoid } from "nanoid"
import { DAYS } from "@/const/const"

type Client_Props = {
    id: string,
    day: string,
    time: string,
    name?: string,
    template?: boolean
}

export default function Client({ id, time, day, name, template }: Client_Props) {
    const currentId = id
    const { clientName, setClientName, editOpenStatus, updateClientByDaysData, statusDataFromDB, searchViewClient, addClientCompleted, setEditStatus, getDataDB, clientByDay, searchClient, clientDataAction } = useClientStore()
    const [clientNameComponent, setClientNameComponent] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [clientTime, setClientTime] = useState('EDIT');

    // useEffect(() => {
    //     if (statusDataFromDB) {
    //         console.log(clientByDay)
    //     } else {
    //         getDataDB()
    //         console.log(clientByDay)
    //     }
    // }, [])
    // console.log()

    useEffect(() => {
        const object = {
            day: day, id: currentId, time: time
        }
        const tempResult = searchClient(object)

        setClientNameComponent(tempResult)

    }, [clientNameComponent, currentId, day, searchClient, time]
    )
    const editOpenHandler = () => {
        if (editOpenStatus) {
            return
        } else {
            setEditStatus(true)
            setShowModal(true)


        }
    }
    const editCloseHandler = () => {
        setClientNameComponent(searchClient({ day: day, id: currentId, time: time }))
        setShowModal(false)
        setEditStatus(false)
    }

    return (

        <div className={`rounded opacity-100`}>
            <>
                <button
                    onClick={editOpenHandler}
                    disabled={editOpenStatus}
                >
                    <span>
                        {clientNameComponent}
                    </span>
                </button>
                < Edit_Modal_Window
                    show={showModal}
                    day={day}
                    time={time}
                    close={editCloseHandler}
                    id={currentId}
                    name={setClientTime}
                />
            </>
        </div>
    )
}
