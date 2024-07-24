import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DAYS } from '@/const/const';

type Data_Workers_Type = {
  name: string;
};

type Days_Cell_Type = {
  day: string;
  workers: Data_Workers_Type[];
};

interface WorkersStoreProps {
  daysCell: Days_Cell_Type[];
  updateDaysCellsData: (day: string, workerName: string) => void;
  workersByDays: (day: string) => Data_Workers_Type[];
}

const initialState: Days_Cell_Type[] = [
  {
    day: DAYS.MONDAY,
    workers: [],
  },
  {
    day: DAYS.TUESDAY,
    workers: [],
  },
  {
    day: DAYS.WEDNESDAY,
    workers: [],
  },
  {
    day: DAYS.THURSDAY,
    workers: [],
  },
  {
    day: DAYS.FRIDAY,
    workers: [],
  },
  {
    day: DAYS.SATURDAY,
    workers: [],
  },
  {
    day: DAYS.SUNDAYS,
    workers: [],
  },
];

export const useWorkerStore = create<WorkersStoreProps>()(
    (set, get) => ({
      daysCell: initialState,
      updateDaysCellsData: (day, workerName) => {
        set((state) => {
          
          const updatedDaysCell = state.daysCell.map((item) =>
            item.day === day && !item.workers.find((worker) => worker.name === workerName )
              ? { ...item, workers: [...item.workers, { name: workerName }] }
              : item
          );
          return { daysCell: updatedDaysCell };
        });
      },
      workersByDays: (day) => {
        const dayCell = get().daysCell.find((item) => item.day === day);
        return dayCell ? dayCell.workers : [];
      },
    }),
);
