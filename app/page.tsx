import Image from "next/image";
import Header from "./components/Header";
import Search from "./components/Search";

export default function Home() {
  return (
    <div className="container">
    <Header/>
      <main>
        <h1 className="text-5xl font-display text-center">How's the sky looking today?</h1>
        <Search/>
      </main>
    </div>
  );
}
