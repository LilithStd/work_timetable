type Border_List_Workers_Props = {
  name?: string,
  update?: boolean
}
export default function Border_List_Workers({ name, update }: Border_List_Workers_Props) {
  const Workers_List: (string | undefined)[] = []

  if (update) {
    Workers_List.length <= 0 ? Workers_List.push(name) : Workers_List
  }


  return (
    <div>
      { }
    </div>
  )
}
