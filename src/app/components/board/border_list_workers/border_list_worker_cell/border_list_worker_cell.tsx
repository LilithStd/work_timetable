
type Border_list_worker_cell_Props = {
    id: string,
    name?: string
}
export default function Border_list_worker_cell({ id, name }: Border_list_worker_cell_Props) {
    return (
        <div
            onDragEnd={() => console.log('drag end')}
        >
            {name ? name : 'Default_name'}
        </div>
    )
}
