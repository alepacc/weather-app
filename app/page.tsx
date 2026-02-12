import Image from "next/image";
import Header from "./components/Header";
import Search from "./components/Search";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center font-sans"> 
    <Header/>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center  py-4 px-2 sm:items-start">
        <h1 className="text-5xl font-display text-center">How's the sky looking today?</h1>
        <Search/>
      </main>
    </div>
  );
}
