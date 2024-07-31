import { create } from "zustand";
type ClientNameProps = {
    id:string,
    name:string
}
type useClientStoreProps = {
    editOpenStatus:boolean,
    clientName:ClientNameProps,
    setEditStatus: (status:boolean) => void,
    setClientName: (data:ClientNameProps) => void
}


export const useClientStore = create<useClientStoreProps>()(
    (set, get) => ({
        editOpenStatus:false,
        clientName:{id:'',name:''},
        setEditStatus: (status) => set({ editOpenStatus: status }),
        setClientName:(data) => set({ clientName:{id:data.id,name:data.name}})
    })
)