import { NextResponse } from "next/server";

export async function POST(req){
    //grab request body
    const city = await req.text()
    const forecast = {};
    //fetch the weatherbit api endpoint to get weather forecast for 5 days
    await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=5&units=I&key=${process.env.MASTER_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.data)
        data.data.forEach(entry =>{
            const date = entry.valid_date
            forecast[date] = [entry.high_temp, entry.low_temp, entry.weather]
        })
    })

    
    
    

    //grab specifically the highs, lows, and weather icon info
    

    //grab current weather
    await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&units=I&key=${process.env.MASTER_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.data[0])
        forecast["current"] = [data.data[0].ob_time, data.data[0].temp, data.data[0].weather, data.data[0].wind_spd]
    })
    return NextResponse.json(forecast)
} 