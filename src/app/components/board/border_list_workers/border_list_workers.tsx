import { WORKER_LIST } from "@/app/variables/worker_list"

type Border_List_Workers_Props = {
  name?: string,
  update?: boolean
}
export default function Border_List_Workers({ name, update }: Border_List_Workers_Props) {
  const Workers_List = WORKER_LIST
  const border_list_Worker = new Array(8).fill("Test")

  if (update) {

  }


  return (
    <div className="grid">
      <div className="grid grid-cols-7 grid-rows-1  col-start-2 col-end-9">
        {border_list_Worker.map((item) => <div className="border-2 text-center">{item}</div>)}
      </div>
      <div className="grid grid-cols-1 grid-row-4">
        {Workers_List.map((item) => <span className="border-2 text-center">{item.name}</span>)}
      </div>
    </div>
  )
}
