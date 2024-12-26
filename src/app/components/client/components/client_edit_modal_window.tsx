
import { useClientStore } from "@/app/store/client_store"
import { CLIENT_DATA_STATUS } from "@/const/const"
import { useEffect, useState } from "react"

type Edit_Modal_Window_Props = {
    show: boolean,
    day: string,
    time: string,
    close: () => void,
    id: string
}

export default function Client_Edit_Modal_Window({ time, id, day, show, close }: Edit_Modal_Window_Props) {
    const { searchViewClient, checkClientData, setClientName, setClientData, clientByDay } = useClientStore()
    const [editClientName, setEditClientName] = useState('')

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
        console.log(id, clientByDay)
        if (editClientName === '') {
            setEditClientName('')
            close()
            console.log('submit if string = 0')

        } else {
            if (checkClientData(id, editClientName, day)) {
                setClientName({ id: id, name: editClientName })
                setClientData(id, day, CLIENT_DATA_STATUS.UPDATE_CLIENT_DATA, { timeToClient: { id: id, time: time, name: editClientName } })
                console.log('update branch')
                setEditClientName('')
                close()
            } else {
                setClientName({ id: id, name: editClientName })
                setClientData(id, day, CLIENT_DATA_STATUS.ADD_CLIENT_DATA, { timeToClient: { id: id, time: time, name: editClientName } })
                console.log('submit add branch')
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
