"use client";
import Header from "./components/Header";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Daily from "./components/Daily";
import Hourly from "./components/Hourly";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { City } from "./types/city";

export default function Home() {
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [weather, setWeather] = useState({ current: {} } as any);
  const [location, setLocation] = useState<City | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState<boolean>(false);

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
        if (res.status === 500) {
          console.warn("Error:", res.status);
          setApiError(true);
          return;
        }
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
        `/api/weather?lat=${city.latitude}&lon=${city.longitude}&name=${city.name}&country=${city.country}`,
      );
      if (!res.ok) {
        console.error("Weather API error", res.status);
        return;
      }
      const data = await res.json();
      if (data.weather.error) {
        setApiError(true);
        return;
      }
      setLocation(data.location);
      setWeather(data.weather);
      console.log("weather data:", data.weather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setSuggestions([]); // close dropdown
      setCity(""); // clear input field
    }
  };

  const normalize = (str?: string) =>
    (str ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const unique = useMemo(() => {
    const seen = new Set();
    return suggestions.filter((item) => {
      const identifier = `${normalize(item.name)}-${normalize(item.country)}-${normalize(item.admin1)}`;
      if (seen.has(identifier)) return false;
      seen.add(identifier);
      return true;
    });
  }, [suggestions]);
  // console.log(unique);

  return (
    <div className="container">
      <Header />
      {apiError ? (
        <div className="api-error items-center flex flex-col gap-4 p-4 text-center">
          <Image
            src="/images/icon-error.svg"
            alt="error img"
            width={20}
            height={20}
          />
          <h1 className="text-5xl text-center">Something went wrong</h1>
          <p>
            We coudn't connect to the server (API error). Please try again in a
            few moments.
          </p>
          <button
            className="btn-primary flex gap-2"
            onClick={() => window.location.reload()}
          >
            <Image
              src="/images/icon-retry.svg"
              alt="retry img"
              width={15}
              height={15}
            />
            Retry
          </button>
        </div>
      ) : (
        <main>
          <h1 className="text-5xl font-display text-center">
            How's the sky looking today?
          </h1>
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
      )}
    </div>
  );
}
