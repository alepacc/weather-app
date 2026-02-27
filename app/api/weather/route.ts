import { NextResponse } from "next/server";

export async function GET(req:Request){
    const { searchParams } = new URL(req.url);
    
    const { latitude, longitude, name, country } = {
        latitude: searchParams.get("latitude"),
        longitude: searchParams.get("longitude"),
        name: searchParams.get("name"),
        country: searchParams.get("country"),
    };

    const params = {
        daily: ["temperature_2m_min", "temperature_2m_max", "weather_code"],
        hourly: ["temperature_2m", "weather_code"],
        current: ["weather_code", "temperature_2m", "relative_humidity_2m", "wind_speed_10m", "precipitation", "apparent_temperature"],
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    const weatherRes = await fetch(`
        ${url}?latitude=${latitude}&longitude=${longitude}&daily=${params.daily.join(",")}&hourly=${params.hourly.join(",")}&current=${params.current.join(",")} 
        `);


    const weatherData = await weatherRes.json();

    return NextResponse.json({
        location: { name, country },
        weather: weatherData,
    });
}