
import Board from "@/app/components/board/board";
import dayjs from "dayjs";
const dataNow = dayjs()
const daysOfMonth = dataNow.daysInMonth();
const daysWeek = new Array(7).fill(null).map(() => { })
console.log(daysOfMonth)

export default function MainPages() {
  return (
    <main>
      <Board />
    </main>
  );
}
