import Image  from "next/image";
import { weatherCodeMap } from "../utils/weatherCodeMap";

export default function Daily(
  props:{
    weatherCode: number[],
    tempMax: number[],
    tempMin: number[]
  }
) {
    const {weatherCode, tempMax, tempMin} = props;
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return(
        <div className="daily">
          <h2 className="daily__title">Daily forecast</h2>
          <div className="daily__item">
            {days.map((day, index) => (
              <div key={day} className="daily__forcast card">
                <span className="daily__forcast-day">{day}</span>
                <span className="daily__forcast-icon">
                  {weatherCode !== undefined && (
                    <Image src={weatherCodeMap[weatherCode[index]]?.image} alt={weatherCodeMap[weatherCode[index]]?.desc} width={50} height={50} />
                  )}
                </span>
                <span className="daily__forcast-temp">
                  <p className="temp-max">{tempMax !== undefined ? `${tempMax[index]}°`: ''}</p> 
                  <p className="temp-min">{tempMin !== undefined ? `${tempMin[index]}°`: ''}</p>
                </span>
              </div>
            ))}
            </div>

        </div>
    )
}