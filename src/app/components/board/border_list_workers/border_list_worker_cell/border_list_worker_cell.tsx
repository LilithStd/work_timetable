
type Border_list_worker_cell_Props = {
    name?: string
}
export default function Border_list_worker_cell({ name }: Border_list_worker_cell_Props) {
    return (
        <div>{name ? name : 'Default_name'}</div>
    )
}
