import Image from "next/image";
import { weatherCodeMap } from "../utils/weatherCodeMap";
import { getDay } from "../utils/formatDate";
import { useUnit } from "../context/unitContext";
import { cToF } from "../utils/conversions";

export default function Daily(props: {
  days: string[];
  weatherCode: number[];
  tempMax: number[];
  tempMin: number[];
}) {
  const { days, weatherCode, tempMax, tempMin } = props;
  const { unit } = useUnit();

  return (
    <div className="daily">
      <h2 className="daily__title">Daily forecast</h2>
      <div className="daily__item">
        {days.map((day, index) => (
          <div key={day} className="daily__forcast card">
            <span className="daily__forcast-day">{getDay(day, true)}</span>
            <span className="daily__forcast-icon">
              {weatherCode !== undefined && (
                <Image
                  src={weatherCodeMap[weatherCode[index]]?.image}
                  alt={weatherCodeMap[weatherCode[index]]?.desc}
                  width={50}
                  height={50}
                />
              )}
            </span>
            <span className="daily__forcast-temp">
              <p className="temp-max">
                {tempMax !== undefined
                  ? unit === "metric"
                    ? `${Math.round(tempMax[index])}°`
                    : `${cToF(tempMax[index]).toFixed(0)}°`
                  : ""}
              </p>
              <p className="temp-min">
                {tempMin !== undefined
                  ? unit === "metric"
                    ? `${Math.round(tempMin[index])}°`
                    : `${cToF(tempMin[index]).toFixed(0)}°`
                  : ""}
              </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
