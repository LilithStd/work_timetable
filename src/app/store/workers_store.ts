import { DAYS } from '@/const/const'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Data_Workers_Type = {
    day:string,
    name:string
}

type Days_Type = {
  day:string,
  workers:Data_Workers_Type[]
}



interface WorkersStoreProps {
	daysCell:Days_Type[],
	updateWorkersList:() => void,
  updateDayCell:({day,name}:Data_Workers_Type) => void
}

const initialState = [
  {
    day:DAYS.MONDAY,
    workers:[]
  },
  {
    day:DAYS.TUESDAY,
    workers:[]
  },
  {
    day:DAYS.WEDNESDAY,
    workers:[]
  },
  {
    day:DAYS.THURSDAY,
    workers:[]
  },
  {
    day:DAYS.FRIDAY,
    workers:[]
  },
  {
    day:DAYS.SATURDAY,
    workers:[]
  },
  {
    day:DAYS.SUNDAYS,
    workers:[]
  }

]

export const worker_store = create<WorkersStoreProps>()(
  persist(
    (set, get) => ({
      daysCell:initialState,
      updateWorkersList: () => {
        return
      },
      updateDayCell: (data) => {
        daysCell:get().daysCell.map((item) => item.workers.map((arrayItem) => )) 
      }
  //     schedule: initialState,
  //      addWorker: (day, worker) => set((state) => ({
  //       schedule: state.schedule.map((d) =>
  //     d.day === day ? { ...d, workers: [...d.workers, worker] } : d
  //   )
  // })),
    }),
    {
      name: 'workers-storage',
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
)