import { NextResponse } from "next/server"; 

export async function GET(req:Request) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if(!city){
        return NextResponse.json({ error: "City required" }, { status: 400 });
    }

    // get geo coordinates by city name
    const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );

    if (!geoRes.ok) {
        console.error("Error fetching geocoding data:", geoRes.status);
        return NextResponse.json({ error: "Error fetching geocoding data" }, { status: 500 });
    }

    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json({ error: "City not found" }, { status: 404 });
    } else {
        return NextResponse.json({ location: geoData.results });
    }

}