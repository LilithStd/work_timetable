type Client_Props = {
    name?: string
}

export default function Client({ name }: Client_Props) {
    return (

        <div className=" rounded">
            <span>
                {name ? name : "Client"}
            </span>
        </div>
    )
}
