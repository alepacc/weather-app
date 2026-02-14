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

      <div className="hourly__item">
        <span className="hourly__time">Now</span>
        <Image
          src="/images/icon-sunny.webp"
          alt="sunny icon"
          width={30}
          height={30}
        />
        <span className="hourly__temp">20°</span>
      </div>
      <div className="hourly__item">
        <span className="hourly__time">1 PM</span>
        <Image
          src="/images/icon-sunny.webp"
          alt="sunny icon"
          width={30}
          height={30}
        />
        <span className="hourly__temp">20°</span>
      </div>
      <div className="hourly__item">
        <span className="hourly__time">2 PM</span>
        <Image
          src="/images/icon-sunny.webp"
          alt="sunny icon"
          width={30}
          height={30}
        />
        <span className="hourly__temp">20°</span>
      </div>
      <div className="hourly__item">
        <span className="hourly__time">3 PM</span>
        <Image
          src="/images/icon-sunny.webp"
          alt="sunny icon"
          width={30}
          height={30}
        />
        <span className="hourly__temp">20°</span>
      </div>
      <div className="hourly__item">
        <span className="hourly__time">4 PM</span>
        <Image
          src="/images/icon-sunny.webp"
          alt="sunny icon"
          width={30}
          height={30}
        />
        <span className="hourly__temp">20°</span>
      </div>
    </div>
  );
}
