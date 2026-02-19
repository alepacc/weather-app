'use client';
import Header from "./components/Header";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather"
import Daily from "./components/Daily";
import Hourly from "./components/Hourly";

export default function Home() {
  const handleSearch = (city: string) => {
    console.log("Searching for city:", city);
    const res = fetch(`/api/weather?city=${city}`)
      .then(response => response.json())
      .then(result => {
        console.log("Weather data for", city, ":", result);
        // You can update your state here with the fetched weather data to display it in your components.
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
            <CurrentWeather />
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
