import { NextResponse } from "next/server"; 

export async function GET(req:Request) {
    const {searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if(!city){
        return NextResponse.json({ error: "City required" }, { status: 400 });
    }

    // get geo coordinates by city name
    const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const { latitude, longitude, name, country } = geoData.results[0];  

    // get weather
    const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m&forecast_days=1`
    );

    const weatherData = await weatherRes.json();

    return NextResponse.json({
        location: { name, country },
        weather: weatherData,
    });

}