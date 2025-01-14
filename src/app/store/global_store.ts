import { create } from "zustand";

interface GlobalStoreProps {
    clientEditOpenStatus:boolean,
    setClientEditStatus: (status:boolean) => void,
}

export const useGlobalStore = create<GlobalStoreProps>()(
    (set, get) => ({
        clientEditOpenStatus:false,
        setClientEditStatus: (status) => set({ clientEditOpenStatus: status }),
    }),
);
