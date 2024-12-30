'use client'
import { useEffect, useState } from "react"
import Client_Edit_Modal_Window from "./components/client_edit_modal_window"
import { useClientStore } from "@/app/store/client_store"
import { useDateStore } from "@/app/store/date_strore"

type Client_Props = {
    id: string,
    day: string,
    time: string,
    name?: string,
    template?: boolean
}

export default function Client({ id, time, day, name, template }: Client_Props) {
    const currentId = id
    const { editOpenStatus, setEditStatus, searchClient, clientByDay } = useClientStore()
    const { numberCurrentWeekInMonth } = useDateStore()
    const [clientNameComponent, setClientNameComponent] = useState('')
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        const object = {
            day: day, id: currentId, time: time
        }
        const tempResult = searchClient(object)

        setClientNameComponent(tempResult)

    }, [currentId, day, searchClient, time]
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
        setShowModal(false);
        setEditStatus(false);

    }

    // console.log(clientByDay)

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
                < Client_Edit_Modal_Window
                    show={showModal}
                    day={day}
                    time={time}
                    close={editCloseHandler}
                    id={currentId}
                />
            </>
        </div>
    )
}
