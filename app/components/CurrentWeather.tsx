import Image from "next/image"
import { weatherCodeMap } from "../utils/weatherCodeMap"

export default function CurrentWeather(
    props: { 
        city: string; 
        country: string;
        date?: string;
        temperature?: number;
        condition?: number;
        feelsLike?: number;
        humidity?: number;
        windSpeed?: number;
        precipitation?: number;
    }
) {
    const { city, country, date, temperature, condition, feelsLike, humidity, windSpeed, precipitation } = props;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(date);
    };

    return (
    <>
        <div className="location card">
            <span className="location__header">
                <h2 className="location__name">{city&&`${city}, ${country}`}</h2>
                <h3 className="location__date">{date ? formatDate(date) : ""}</h3>
            </span>
            <span className="location__condition">
                {condition !== undefined ? (
                    <Image src={weatherCodeMap[condition]?.image } alt={weatherCodeMap[condition]?.desc } width={100} height={100} />
                ) : ('Loading...')}
                <h1 className="location__temperature">{temperature !== undefined && `${temperature}°`}</h1>
            </span>
            
        </div>
        <div className="details__item"> 
            {/* TODO: add measure units */}
            <div className="details__item--temperature card min-w-34">
                <h3>Feels like</h3>
                <span className="detail--temp">{feelsLike !== undefined ? `${feelsLike}°` : '__' }</span>
            </div>
            <div className="details__item--condition card  min-w-34">
                <h3>Humidity</h3>
                
                <span className="detail--humidity">{humidity !== undefined ? `${humidity}%` : '__'}</span>
            </div>
            <div className="details__item--wind card  min-w-34">
                <h3>Wind</h3>
                <span className="detail--wind">{windSpeed !== undefined ? `${windSpeed} km/h` : '__'}</span>
            </div>
            <div className="details__item--precipitation card  min-w-34">
                <h3>Precipitation</h3>
                <span className="detail--prec">{precipitation !== undefined ? `${precipitation} mm` : '__'}</span>
            </div>
        </div>
    </>
    )
}