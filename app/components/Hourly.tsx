"use client";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useEffect, useMemo, useState } from "react";
import { weatherCodeMap } from "../utils/weatherCodeMap";
import { getDay, getTimeShort } from "../utils/formatDate";

export default function Hourly(props: {
  currentTime: Date;
  weatherCode: number[];
  temperature: number[];
  time: string[];
}) {
  const { currentTime, weatherCode, temperature, time } = props;
  const currentDay = currentTime ? getDay(currentTime.toString()) : "";
  const [day, setDay] = useState<string | null>(currentDay || null);

  // set the current day as default value for the dropdown when the component mounts
  useEffect(() => {
    if (currentDay && !day) {
      setDay(currentDay);
    }
  }, [currentDay, day]);

  const formattedHourly = useMemo(() => {
    return (
      time &&
      time.map((value, index) => ({
        dateTime: value,
        day: getDay(value),
        hour: getTimeShort(value),
        temperature: temperature[index],
        weatherCode: weatherCode[index],
      }))
    );
  }, [time, temperature, weatherCode]);

  // create a list of unique week days from the current day to populate the dropdown
  const weekDays = useMemo(() => {
    return Array.from(new Set(formattedHourly?.map((item) => item.day))).filter(
      Boolean,
    ) as string[];
  }, [formattedHourly]);

  // filter the hourly data to show only the hours of the selected day, and slice it to show only the next 8 hours
  const filteredHourly = useMemo(() => {
    if (!formattedHourly || !day) return [];
    return formattedHourly.filter((item) => item.day === day);
  }, [formattedHourly, day]);

  return (
    <>
      <div className="hourly card ">
        <span className="hourly_header ">
          <h2 className="hourly__title">Hourly forecast</h2>
          <Dropdown
            label="—"
            option={weekDays}
            value={day}
            onChange={setDay}
          />
        </span>
        <div className="hourly__list">
        {filteredHourly.map((item, index) => (
          <div key={index} className="hourly__item">
            <span className="hourly__time">
              <Image
                src={weatherCodeMap[item.weatherCode].image}
                alt={weatherCodeMap[item.weatherCode].desc}
                width={30}
                height={30}
              />
              {item.hour}
            </span>

            <span className="hourly__temp">{item.temperature}°</span>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
