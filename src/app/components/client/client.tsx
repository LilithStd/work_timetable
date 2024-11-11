'use client'

import { useEffect, useState } from "react"
import Edit_Modal_Window from "./components/client_edit_modal_window"
import { useClientStore } from "@/app/store/client_store"
import { nanoid } from "nanoid"
import { DAYS } from "@/const/const"

type Client_Props = {
    id: string,
    day: string,
    time?: string,
    name?: string,
    template?: boolean
}

export default function Client({ id, time, day, name, template }: Client_Props) {
    const currentId = id
    const { clientName, setClientName, editOpenStatus, updateClientByDaysData, setEditStatus, clientByDay } = useClientStore()
    const [clientNameComponent, setClientNameComponent] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [clientTime, setClientTime] = useState(time ? time : '');
    const [ids, setID] = useState('');



    useEffect(() => {
        if (clientName.name !== '' && clientName.id === currentId) {
            setClientNameComponent(clientName.name)
        }
    }, [clientName, currentId]
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
        setShowModal(false)
        setEditStatus(false)
        // console.log(clientByDay)
    }

    return (

        <div className={`rounded opacity-100`}>
            {clientNameComponent === '' ?
                <>
                    <button
                        onClick={editOpenHandler}
                        disabled={editOpenStatus}
                    >
                        EDIT
                    </button>
                    < Edit_Modal_Window
                        show={showModal}
                        day={day}
                        time={time ? time : ''}
                        close={editCloseHandler}
                        id={currentId} />
                </>

                :
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
                        time={time ? time : ''}
                        close={editCloseHandler}
                        id={currentId} />
                </>

            }

        </div>
    )
}
