import { create } from "zustand";
type useClientStoreProps = {
    editOpenStatus:boolean,
    setEditStatus: (status:boolean) => void
}


export const useClientStore = create<useClientStoreProps>()(
    (set, get) => ({
        editOpenStatus:false,
        setEditStatus: (status) => set({ editOpenStatus: status })
    })
)