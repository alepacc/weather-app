"use client";
import Header from "./components/Header";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Daily from "./components/Daily";
import Hourly from "./components/Hourly";
import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [weather, setWeather] = useState({ current: {} } as any);
  const [location, setLocation] = useState<City | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  type City = {
    name: string;
    country: string;
    admin1?: string;
    latitude?: number;
    longitude?: number;
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(city);
    }, 500);

    if (city.length >= 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    return () => clearTimeout(timer);
  }, [city]);

  useEffect(() => {
    if (!debouncedCity || debouncedCity.trim().length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }  
    const fetchCities = async () => {
      const controller = new AbortController();
      try {
        const q = encodeURIComponent(debouncedCity);
        const res = await fetch(`/api/search?city=${q}`, {
          signal: controller.signal,
        });
        // const res = await fetch(`/api/search?city=${debouncedCity}`);
        if (!res.ok) {
          console.error("Search API error", res.status);
          setSuggestions([]);
          setError("No search results found!");
          return;
        }
        setError(null);
        const data = await res.json();
        setSuggestions(data.location);
        // console.log("suggestion cities:", data.location);
      } catch (error: any) {
        console.error("Errror fetching cities:", error);
        setSuggestions([]);
      }
    };

    fetchCities();
  }, [debouncedCity]);

 
  const handleSelectCity = async (city: City) => {
    try {
      const res = await fetch(
        `/api/weather?lat=${city.latitude}&lon=${city.longitude}&name=${city.name}&country=${city.country}`
      );
      if(!res.ok){
        console.error("Weather API error", res.status);
        return;
      }
      const data = await res.json();
      setLocation(data.location);
      setWeather(data.weather);

    } catch (error) 
    {
      console.error("Error fetching weather data:", error);
      return;
      
    } 
    setSuggestions([]); // close dropdown
    setCity(""); // clear input field
  };

  // remove duplicates from suggestions
  // const unique = suggestions.filter(
  //   (item, index, self) =>
  //     index ===
  //     self.findIndex(
  //       (t) =>
  //         t.name === item.name &&
  //         t.country === item.country &&
  //         t.admin1 === item.admin1,
  //     ),
  // );
  // console.log(unique);

//   suggestions.forEach(item => {
//   console.log(`${item.name}-${item.country}-${item.admin1}`);
// });

const normalize = (str?: string) =>
  (str ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const seen = new Set();
const unique = suggestions.filter(item => {
  const identifier = `${normalize(item.name)}-${normalize(item.country)}-${normalize(item.admin1) }`;
  if (seen.has(identifier)) {
    return false;
  } else {
    seen.add(identifier);
    return true;
  }
});
console.log(unique);


  return (
    <div className="container">
      <Header />
      <main>
        <h1 className="text-5xl font-display text-center">
          How's the sky looking today?
        </h1>
        {/* TODO: clear input field  */}
        <Search 
          value={city}
          onChange={setCity}
          suggestions={unique}
          onSelect={handleSelectCity}
          loading={loading}
        />
        {error && <p className="error-message">{error}</p>}
        {error === null && location && weather ? (
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
          {weather?.daily && (
            <Daily 
              days={weather.daily.time}
              weatherCode={weather.daily.weather_code}
              tempMax={weather.daily.temperature_2m_max}
              tempMin={weather.daily.temperature_2m_min}
            />
          )}
          </article>
          <aside>
            <Hourly
              currentTime={weather.current.time}
              weatherCode={weather.hourly?.weather_code}
              temperature={weather.hourly?.temperature_2m}
              time={weather.hourly?.time}
            />
          </aside>
        </section>
      ) : null}
      </main>
    </div>
  );
}
