
type Shared_Button_Props = {
    type?: string,
    callBack?: () => void
}
export default function Shared_Button({ type, callBack }: Shared_Button_Props) {
    return (
        <button className='border-2 hover:bg-amber-400'>
            EDIT
        </button>
    )
}
