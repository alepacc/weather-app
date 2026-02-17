import Image from "next/image";
import Header from "./components/Header";
import Search from "./components/Search";
import Location from "./components/Location"
import Daily from "./components/Daily";
import Hourly from "./components/Hourly";

export default function Home() {
  return (
    <div className="container">
    <Header/>
      <main>
        <h1 className="text-5xl font-display text-center">How's the sky looking today?</h1>
        <Search/>
        <section className="lg:flex gap-4">
          <article className="weather">
            <Location />
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
