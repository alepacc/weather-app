import { NextResponse } from "next/server"; 
import { fetchWeatherApi } from "openmeteo";

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

    // // get weather
    // const weatherRes = await fetch(
    //     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature&forecast_days=1`
    // );


    const params = {
        daily: ["temperature_2m_min", "temperature_2m_max", "weather_code"],
        hourly: ["temperature_2m", "weather_code"],
        current: ["weather_code", "temperature_2m", "relative_humidity_2m", "wind_speed_10m", "precipitation", "apparent_temperature"],
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    const weatherRes = await fetch(`
        ${url}?latitude=${latitude}&longitude=${longitude}&daily=${params.daily.join(",")}&hourly=${params.hourly.join(",")}&current=${params.current.join(",")} `);
    // const responses = await fetchWeatherApi(url, params);

    // // Process first location. Add a for-loop for multiple locations or weather models
    // const response = responses[0];

    // // Attributes for timezone and location
    // // const latitude = response.latitude();
    // // const longitude = response.longitude();
    // const elevation = response.elevation();
    // const utcOffsetSeconds = response.utcOffsetSeconds();

    // console.log(
    //     `\nCoordinates: ${latitude}°N ${longitude}°E`,
    //     `\nElevation: ${elevation}m asl`,
    //     `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    // );

    // const current = response.current()!;
    // const hourly = response.hourly()!;
    // const daily = response.daily()!;

    // // Note: The order of weather variables in the URL query and the indices below need to match!
    // const weatherData = {
    //     current: {
    //         time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    //         weather_code: current.variables(0)!.value(),
    //         temperature_2m: current.variables(1)!.value(),
    //         relative_humidity_2m: current.variables(2)!.value(),
    //         wind_speed_10m: current.variables(3)!.value(),
    //         precipitation: current.variables(4)!.value(),
    //         apparent_temperature: current.variables(5)!.value(),
    //     },
    //     hourly: {
    //         time: Array.from(
    //             { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
    //             (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
    //         ),
    //         temperature_2m: hourly.variables(0)!.valuesArray(),
    //         weather_code: hourly.variables(1)!.valuesArray(),
    //     },
    //     daily: {
    //         time: Array.from(
    //             { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
    //             (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
    //         ),
    //         temperature_2m_min: daily.variables(0)!.valuesArray(),
    //         temperature_2m_max: daily.variables(1)!.valuesArray(),
    //         weather_code: daily.variables(2)!.valuesArray(),
    //     },
    // };




    const weatherData = await weatherRes.json();

    return NextResponse.json({
        location: { name, country },
        weather: weatherData,
    });

}