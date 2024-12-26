'use client'
import { useEffect, useState } from "react"
import Client_Edit_Modal_Window from "./components/client_edit_modal_window"
import { useClientStore } from "@/app/store/client_store"

type Client_Props = {
    id: string,
    day: string,
    time: string,
    name?: string,
    template?: boolean
}

export default function Client({ id, time, day, name, template }: Client_Props) {
    const currentId = id
    const { editOpenStatus, setEditStatus, searchClient, updateClient, clientName } = useClientStore()
    const [clientNameComponent, setClientNameComponent] = useState('')
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        const object = {
            day: day, id: currentId, time: time
            // day: day, id: currentId, time: time
        }
        const tempResult = searchClient(object)

        setClientNameComponent(tempResult)

    }, [currentId, day, searchClient, time, updateClient]
    )

    const editOpenHandler = () => {
        setEditStatus(true)
        setShowModal(true)
        // if (editOpenStatus) {
        //     return
        // } else {
        //     setEditStatus(true)
        //     setShowModal(true)
        // }
    }
    const editCloseHandler = () => {
        setClientNameComponent(searchClient({ day: day, id: currentId, time: time }))
        // const temp = searchClient({ day: day, id: '58ElfngPGzm5YcXYY6Gl3', time: time })
        // setClientNameComponent(temp);
        // console.log(searchClient({ day: day, id: currentId, time: time }))
        setShowModal(false);
        setEditStatus(false);

    }

    return (
        <div className={`rounded opacity-100`}>
            <>
                <button
                    onClick={editOpenHandler}
                    disabled={editOpenStatus}
                >
                    <span>
                        {/* {clientName} */}
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
