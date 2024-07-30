'use client'

import { useState } from "react"
import Edit_Modal_Window from "./components/edit_modal_window"
import { useClientStore } from "@/app/store/client_store"

type Client_Props = {
    name?: string,
    template?: boolean
}

export default function Client({ name, template }: Client_Props) {
    const setEditStatus = useClientStore((state) => state.setEditStatus)
    const globalEditStatus = useClientStore((state) => state.editOpenStatus)
    const [clientName, setClientName] = useState('default')
    const [showModal, setShowModal] = useState(false)
    const editOpenHandler = () => {
        if (globalEditStatus) {
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
            {clientName === 'default' ?
                <>
                    <button
                        onClick={editOpenHandler}
                        disabled={globalEditStatus}
                    >
                        EDIT
                    </button>
                    < Edit_Modal_Window show={showModal} close={editCloseHandler} />
                </>

                :
                <span>
                    {clientName}
                </span>
            }

        </div>
    )
}
