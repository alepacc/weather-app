"use client";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { weatherCodeMap } from "../utils/weatherCodeMap";
import { getDay, getTimeShort } from "../utils/formatDate"

export default function Hourly(props: {
  currentTime: Date;
  weatherCode: number[];
  temperature: number[];
  time: string[];
}) {
  const { currentTime, weatherCode, temperature, time } = props;
  
  const formattedHourly = time && time.map((value, index) => ({
      dateTime: value,
      day: getDay(value),
      hour: getTimeShort(value),
      temperature: temperature[index],
      weatherCode: weatherCode[index],
    }));
  

  const currentDay = currentTime ? getDay(currentTime.toString()) : '';
  const [day, setDay] = useState<string | null>(currentDay);
  const weekDays = Array.from(new Set(formattedHourly.map((h) => h.day)));

  console.log("Week days:", weekDays);
  return (
    <>
    <div className="hourly card">
      <span className="hourly_header">
        <h2 className="hourly__title">Hourly forecast</h2>
        <Dropdown
          label="--"
          option={weekDays}
          value={day}
          onChange={setDay}
        />
      </span>
      

      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="hourly__item">
          <span className="hourly__time">
            {
            weatherCode !== undefined ? (
              <Image
                src={weatherCodeMap[weatherCode[i]].image}
                alt={weatherCodeMap[weatherCode[i]].desc}
                width={30}
                height={30}
              />
            ) : ('')
            }
            
            {time && getTimeShort(time[i])}
          </span>

          <span className="hourly__temp">{temperature && `${temperature[i]}°`}</span>
        </div>
      ))}
    </div>
    
    </>
    
  );
}
