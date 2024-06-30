type Worker_Props = {
    name?: string,
    count?: number
}

export default function Worker({ name, count }: Worker_Props) {
    return (

        <div className="bg-pink-600 rounded hover:bg-lime-600">
            <span>
                {name ? name : "Worker"}
            </span>
        </div>
    )
}
