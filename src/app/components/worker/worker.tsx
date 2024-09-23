'use client'
import { useWorkerStore } from "@/app/store/workers_store"
import { nanoid } from "nanoid"
import { useState } from "react"
import Worker_Edit_Modal_Window from "./components/worker_edit_modal_window"

type Worker_Props = {
    id: string,
    name?: string,
    count?: number,
    day: string,
    template?: boolean
}

export default function Worker({ id, name, day, count, template }: Worker_Props) {
    const currentId = id
    const [showModal, setShowModal] = useState(false)
    const editOpenHandler = () => {

        setShowModal(true)


    }
    const editCloseHandler = () => {
        setShowModal(false)

    }
    const workersByDaysStore = useWorkerStore((state) => state.workersByDays)


    return (

        <div
            className={`${template ? 'opacity-20' : ' bg-pink-600 rounded hover:bg-lime-600'}`}

        >
            {template ?
                <button>
                    {"template"}
                </button>
                :
                <>
                    <button
                        onClick={editOpenHandler}
                    >
                        EDIT
                    </button>
                    <Worker_Edit_Modal_Window
                        show={showModal}
                        day={day}
                        close={editCloseHandler}
                        id={currentId} />
                </>
            }
        </div >
    )
}
