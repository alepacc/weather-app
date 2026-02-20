'use client';
import Header from "./components/Header";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather"
import Daily from "./components/Daily";
import Hourly from "./components/Hourly";
import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<{ name: string; country: string }>({ name: "", country: "" });
  const [weather, setWeather] = useState({ current: {} } as any);


  const handleSearch = (city: string) => {
    console.log("Searching for city:", city);
    const res = fetch(`/api/weather?city=${city}`)
      .then(response => response.json())
      .then(result => {
        console.log("Weather data for", city, ":", result);
        setLocation(result.location);
        setWeather(result.weather);
        
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }


  return (
    <div className="container">
    <Header/>
      <main>
        <h1 className="text-5xl font-display text-center">How's the sky looking today?</h1>
        <Search onSearch={handleSearch}/>
        <section className="lg:flex gap-4">
          <article className="weather">
            
            <CurrentWeather 
              city={location?.name} 
              country={location?.country} 
              date={weather?.current?.time}
              temperature={weather?.current?.temperature_2m}
              feelsLike={weather?.current?.apparent_temperature}
              humidity={weather?.current?.relative_humidity_2m}
              windSpeed={weather?.current?.wind_speed_10m}
              condition={weather?.current?.weather_code}
              precipitation={weather?.current?.precipitation}
            />
            <Daily  />
          </article>
          <aside className="weather__hourly">
            <Hourly />
          </aside>
        </section>
     
      </main>
    </div>
  );
}
