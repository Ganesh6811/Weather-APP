import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));
const port=3000;
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",async (req,res)=>{
    try{
        const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=ongole&appid=44b84e976687d4db7cc5010d788aabe3&units=metric`)
        console.log(response.data)
        res.render("main.ejs",{temp: response.data});
    }
    catch(err){
        console.log("Error is accured while gettig the result")
        res.render("main.ejs", { temp: null, error: "Unable to fetch data from OpenWeatherMap." });
 
    } 
});

app.post("/submit",async (req,res)=>{
    var place=req.body.place;
    console.log(place)
    try{
        const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=44b84e976687d4db7cc5010d788aabe3&units=metric`)
        console.log(response.data)
        res.render("main.ejs",{temp: response.data});
    }
    catch(err){
        res.sendFile(__dirname+"/index.html");
        console.log("Error is accured while gettig the result");
        res.render("main.ejs", { temp: null, error: "Unable to fetch data from OpenWeatherMap." });
 
    } 
});

app.listen(port,()=>{
    console.log(`Server is running perfectly on http://localhost:${port}`)
})

