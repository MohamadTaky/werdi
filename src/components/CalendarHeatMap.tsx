import { scaleLinear } from "d3";
import {
  differenceInDays,
  addDays,
  endOfYear,
  startOfYear,
  startOfWeek,
  addMonths,
  differenceInWeeks,
  format,
  getDay,
  isSameDay,
  isToday,
} from "date-fns";
import ar from "@/lib/date-fns/ar";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  spacing?: number;
  data: Date[];
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export default function CalendarHeatMap({ cellSize = 18, spacing = 2, data, className, ...props }: Props) {
  const margins = { top: 20, bottom: 0, left: 0, right: 30 };
  const height = margins.top + margins.bottom + cellSize * 7 + spacing * 6;
  const width = margins.left + margins.right + cellSize * 53 + spacing * 52;
  const today = new Date();
  const daysCount = differenceInDays(addDays(endOfYear(today), 1), startOfYear(today));
  const days = Array(daysCount)
    .fill(0)
    .map((_v, i) => addDays(startOfYear(today), i));
  const weekDays = Array(7)
    .fill(0)
    .map((_v, i) => addDays(startOfWeek(today), i));
  const months = Array(12)
    .fill(0)
    .map((_v, i) => addMonths(startOfYear(today), i));
  const xScale = scaleLinear()
    .range([width - cellSize - margins.right, margins.left])
    .domain([0, differenceInWeeks(days.at(-1)!, days[0])]);
  const yScale = scaleLinear()
    .range([margins.top, height - cellSize - margins.bottom])
    .domain([0, 6]);

  return (
    <div
      className={twMerge(
        "scroll-hidden no-scrollbar w-full touch-pan-x overflow-auto text-[10px] font-semibold",
        className
      )}
      {...props}
    >
      <svg height={height} width={width} className="mx-auto">
        {months.map((month) => (
          <text
            key={month.toString()}
            width={cellSize}
            height={cellSize}
            x={xScale(differenceInWeeks(month, days[0])) + cellSize}
            y={yScale(0) - 4}
            textAnchor="start"
          >
            {format(month, "MMMM", { locale: ar })}
          </text>
        ))}
        {weekDays
          .filter((_v, i) => i % 2 == 0)
          .map((weekDay) => (
            <text
              key={weekDay.toString()}
              x={width - margins.right + spacing}
              y={yScale(getDay(weekDay)) + spacing}
              textAnchor="end"
              alignmentBaseline="hanging"
            >
              {format(weekDay, "EEEE", { locale: ar }).slice(2)}
            </text>
          ))}
        {days.map((day) => (
          <rect
            key={day.toString()}
            width={cellSize}
            height={cellSize}
            x={xScale(differenceInWeeks(day, days[0]))}
            y={yScale(getDay(day))}
            rx="2"
            className={`${data.some((date) => isSameDay(date, day)) ? "fill-blue-400" : "fill-gray-300"} ${
              isToday(day) ? "stroke stroke-blue-600" : ""
            }`}
          />
        ))}
      </svg>
    </div>
  );
}
