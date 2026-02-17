'use client';
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useState } from "react";

export default function Hourly() {
  const [day, setDay] = useState<string | null>(null);
  return (
    <div className="hourly card">
      <span className="hourly_header">
        <h2 className="hourly__title">Hourly forecast</h2>
        <Dropdown
          label="--"
          option={[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ]}
          value={day}
          onChange={setDay}
        />
      </span>
      
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="hourly__item">
          <span className="hourly__time">
             <Image
                src="/images/icon-sunny.webp"
                alt="sunny icon"
                width={30}
                height={30}
              />
            {i + 1} PM
          </span>
          
          <span className="hourly__temp">20°</span>
        </div>
      ))}
    </div>
  );
}
