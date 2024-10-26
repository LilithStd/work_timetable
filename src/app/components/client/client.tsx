'use client'

import { useEffect, useState } from "react"
import Edit_Modal_Window from "./components/client_edit_modal_window"
import { useClientStore } from "@/app/store/client_store"
import { nanoid } from "nanoid"

type Client_Props = {
    id: string,
    name?: string,
    template?: boolean
}

export default function Client({ id, name, template }: Client_Props) {
    const currentId = id
    const { clientName, setClientName, editOpenStatus, setEditStatus } = useClientStore()
    const [clientNameComponent, setClientNameComponent] = useState('')
    const [showModal, setShowModal] = useState(false)
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
                        close={editCloseHandler}
                        id={currentId} />
                </>

            }

        </div>
    )
}
