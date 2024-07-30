type Edit_Modal_Window_Props = {
    show: boolean,
    close: () => void
}

export default function Edit_Modal_Window({ show, close }: Edit_Modal_Window_Props) {
    if (!show) {
        return null
    }
    return (
        <div
            className="fixed w-56 h-60 bg-white grid grid-cols-2 grid-rows-3"
            onClick={close}
        >
            <span
                className=""
            >Edit modal window</span>
            <label className="grid col-start-1 col-end-2 row-start-2 row-end-2">
                Text input: <input name="myInput" defaultValue="Some initial value" />
            </label>
            <button
                className="border-2 w-8 h-8 hover:bg-red-600 justify-items-end"
                onClick={close}
            >X</button>
        </div>
    )
}
