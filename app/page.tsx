'use client';
import Header from "./components/Header";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather"
import Daily from "./components/Daily";
import Hourly from "./components/Hourly";
import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [weather, setWeather] = useState({current: {}} as any);
  const [location, setLocation] = useState<{ name: string; country: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(city);
    }, 500);

    return () => clearTimeout(timer);
  }, [city]);

  useEffect(() => {
    if (!debouncedCity) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      const res = await fetch(`/api/search?city=${debouncedCity}`);
      const data = await res.json();
      setSuggestions(data.locations || []);
    };

    fetchCities();
    console.log("suggestion cities:", suggestions);
  }, [debouncedCity]);


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

  const handleSelectCity = async (city: any) => {
    const res = await fetch(
      `/api/weather?lat=${city.latitude}&lon=${city.longitude}&name=${city.name}&country=${city.country}`
    );

    const data = await res.json();

    setLocation(data.location);
    setWeather(data.weather);
    setSuggestions([]); // chiude dropdown
  };


  return (
    <div className="container">
    <Header/>
      <main>
        <h1 className="text-5xl font-display text-center">How's the sky looking today?</h1>
        <Search 
        
        onSearch={handleSearch}
         value={city}
  onChange={setCity}
  suggestions={suggestions}
  onSelect={handleSelectCity}  
        />
        <section className="lg:flex gap-4">
          <article>
            
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
            <Daily 
              weatherCode={weather.daily?.weather_code}
              tempMax={weather.daily?.temperature_2m_max}
              tempMin={weather.daily?.temperature_2m_min}
            />
          </article>
          <aside>
            <Hourly 
              currentTime={weather.current.time}
              weatherCode={weather.hourly?.weather_code}
              temperature = {weather.hourly?.temperature_2m}
              time={weather.hourly?.time}
            />
          </aside>
        </section>
     
      </main>
    </div>
  );
}
