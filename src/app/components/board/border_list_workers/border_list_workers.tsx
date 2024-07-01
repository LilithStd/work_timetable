import { WORKER_LIST } from "@/app/variables/worker_list"

type Border_List_Workers_Props = {
  name?: string,
  update?: boolean
}
export default function Border_List_Workers({ name, update }: Border_List_Workers_Props) {
  const Workers_List = WORKER_LIST

  if (update) {

  }


  return (
    <div>
      {Workers_List.map((item) => <span className="grid grid-cols-1">{item.name}</span>)}
    </div>
  )
}
