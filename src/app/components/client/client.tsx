import Shared_Button from "@/app/shared_components/button/shared_button"

type Client_Props = {
    name?: string,
    template?: boolean
}

export default function Client({ name, template }: Client_Props) {
    return (

        <div className={`rounded ${template ? 'opacity-100' : ''}`}>
            {template ?
                <span>
                    <Shared_Button />
                </span>
                :
                <span>
                    {name}
                </span>
            }

        </div>
    )
}
