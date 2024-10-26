import { create } from "zustand";

interface Week {
  Monday: string | number;
  Tuesday: string | number;
  Wednesday: string | number;
  Thursday: string | number;
  Friday: string | number;
  Saturday: string | number;
  Sunday: string | number;
}


interface Week_and_days_Props {
  currentWeek:Week[],
  currentDay:number,
  currentMonth:[],
  setCurrentWeek:(week:Week[]) => void,
  setCurrentMonth:(month:[]) => void,
  setCurrentDay:(day:number) => void
}

export const useDateStore = create<Week_and_days_Props>()(
    (set, get) => ({
      currentWeek:[],
      currentDay:0,
      currentMonth:[],
      setCurrentWeek: (week) => set(() => ({ currentWeek: week })),
      setCurrentMonth: (month) => set(() => ({ currentMonth: month })),
      setCurrentDay: (day) => set(() => ({ currentDay: day })),
    }),
);

