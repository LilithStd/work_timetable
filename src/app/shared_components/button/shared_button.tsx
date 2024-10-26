
type Shared_Button_Props = {
    title?: string,
    type?: string,
    callBackType?: string,
    callBack?: () => void
}
export default function Shared_Button({ title, type, callBackType, callBack }: Shared_Button_Props) {
    //I'll do the refactoring later
    // if(callBackType && callBack) {
    //     switch (callBackType) {
    //         case 'click': return onClick = { callBack }
    //     }
    // }


    return (
        <button className='border-2 hover:bg-amber-400' onClick={callBack}>
            {title ? title : 'EDIT'}
        </button>
    )
}
