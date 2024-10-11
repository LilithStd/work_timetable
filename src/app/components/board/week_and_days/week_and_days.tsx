'use client'
import { useEffect } from 'react';
import { useDateStore } from '@/app/store/week_and_days';
import dayjs from 'dayjs';

interface Week {
  Monday: string | number;
  Tuesday: string | number;
  Wednesday: string | number;
  Thursday: string | number;
  Friday: string | number;
  Saturday: string | number;
  Sunday: string | number;
}

const dataNow = dayjs()
const day = dataNow.format('dddd')
const data = dataNow.format('D')
const todayDate = dataNow.date();

const WeekAndDays = () => {
  // Получаем из стора текущие данные и функции для их обновления
  const { currentWeek, currentDay, setCurrentWeek, setCurrentDay } = useDateStore();

  const fillMonth = () => {
    const daysInMonth = dayjs().daysInMonth(); // количество дней в месяце
    const updatedMonth: Week[] = []; // массив для хранения недель

    let currentWeek: Week = { Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '', Sunday: '' };

    for (let day = 1; day <= daysInMonth; day++) {
      const date = dayjs().date(day); // текущий день
      const weekDay = date.format('dddd') as keyof Week; // день недели

      // Заполняем текущую неделю
      currentWeek[weekDay] = day;

      // Если это воскресенье, добавляем неделю в массив и создаем новую
      if (weekDay === 'Sunday') {
        updatedMonth.push(currentWeek);
        currentWeek = { Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '', Sunday: '' };
      }
    }

    // Обновляем состояние в сторе
    setCurrentWeek(updatedMonth);
    setCurrentDay(Number(data))
  };
  const getCurrentWeekIndex = () => {
    const today = dayjs().date(); // сегодняшнее число
    // Поиск недели, которая включает сегодняшний день
    return currentWeek.findIndex(week => Object.values(week).includes(today));
  };

  useEffect(() => {
    fillMonth(); // Заполняем неделю при монтировании компонента
  }, []);
  const currentWeekIndex = getCurrentWeekIndex();

  const weekToDisplay = currentWeek[currentWeekIndex]; // Неделя для отображения

  return (
    <div className="grid grid-cols-7 grid-rows-1 col-start-2 col-end-9 row-start-2 row-end-2 justify-items-stretch align-baseline place-items-stretch">
      {weekToDisplay ? (
        <>

          <div className={`border-4 text-center h-fit grid  ${weekToDisplay.Monday === currentDay ? 'bg-yellow-500' : ''}`}>Monday
            <span>{weekToDisplay.Monday}</span>
          </div>
          <div className={`border-4 text-center h-fit grid ${weekToDisplay.Tuesday === currentDay ? 'bg-yellow-500' : ''}`}>Tuesday
            <span>{weekToDisplay.Tuesday}</span>
          </div>
          <div className={`border-4 text-center h-fit grid ${weekToDisplay.Wednesday === currentDay ? 'bg-yellow-500' : ''}`}>Wednesday
            <span>{weekToDisplay.Wednesday}</span>
          </div>
          <div className={`border-4 text-center h-fit grid ${weekToDisplay.Thursday === currentDay ? 'bg-yellow-500' : ''}`}>Thursday
            <span>{weekToDisplay.Thursday}</span>
          </div>
          <div className={`border-4 text-center h-fit grid ${weekToDisplay.Friday === currentDay ? 'bg-yellow-500' : ''}`}>Friday
            <span>{weekToDisplay.Friday}</span>
          </div>
          <div className={`border-4 text-center h-fit grid ${weekToDisplay.Saturday === currentDay ? 'bg-yellow-500' : ''}`}>Saturday
            <span>{weekToDisplay.Saturday}</span>
          </div>
          <div className={`border-4 text-center h-fit grid ${weekToDisplay.Sunday === currentDay ? 'bg-yellow-500' : ''}`}>Sunday
            <span>{weekToDisplay.Sunday}</span>
          </div>
        </>

      ) : (
        <div>Текущая неделя не найдена</div>
      )}
    </div>
  );
};

export default WeekAndDays;
