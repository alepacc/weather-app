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
        <Location />
        <Daily  />
        <Hourly />
      </main>
    </div>
  );
}
