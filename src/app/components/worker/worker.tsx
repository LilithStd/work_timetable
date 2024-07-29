import { nanoid } from "nanoid"

type Worker_Props = {
    name?: string,
    count?: number,
    template?: boolean
}

export default function Worker({ name, count, template }: Worker_Props) {
    return (

        <div className={`${template ? 'opacity-20' : ' bg-pink-600 rounded hover:bg-lime-600'}`}
        >
            {template ?
                <span>
                    {"template"}
                </span> :
                <span>
                    {name}
                </span>
            }
        </div>
    )
}
