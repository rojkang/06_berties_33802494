var express = require('express');
var router = express.Router();
const request = require('request');

// GET /weather (form page)
router.get('/', function(req, res) {
    res.render('weatherForm');
});

// POST /weather (city search)
router.post('/', function(req, res, next) {
    let apiKey = "eebfacf63f903bf684e8ee089f9a71f4";
    let city = req.body.city || "london";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(err, response, body) {
        if (err) return next(err);

        let weather = JSON.parse(body);

        if (weather && weather.main) {
            let msg = `
    <div style="
        font-family: Arial;
        padding: 20px;
        max-width: 400px;
        margin: auto;
        border: 1px solid #ccc;
        border-radius: 10px;
        background: #f9f9f9;
    ">
        <h2 style="text-align:center;">Weather for ${weather.name}</h2>
        <p><strong>Temperature:</strong> ${weather.main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${weather.main.feels_like}°C</p>
        <p><strong>Humidity:</strong> ${weather.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${weather.wind.speed} m/s</p>
        <p><strong>Description:</strong> ${weather.weather[0].description}</p>

        <div style="text-align:center; margin-top:15px;">
            <a href="/weather" style="
                padding: 8px 15px;
                background: black;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            ">Search Again</a>
        </div>
    </div>
`;

            res.send(msg);
        } else {
            res.send("No data found. <br><a href='/weather'>Try again</a>");
        }
    });
});

// GET /weather/now — London default
router.get('/now', function(req, res, next) {
    let apiKey = "eebfacf63f903bf684e8ee089f9a71f4";
    let city = "london";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(err, response, body) {
        if (err) return next(err);

        let weather = JSON.parse(body);

if (weather && weather.main) {
    let wmsg = `It is ${weather.main.temp}°C in ${weather.name}.<br>
                Humidity: ${weather.main.humidity}%<br>
                Wind: ${weather.wind.speed} m/s`;
    res.send(wmsg);
} else {
    res.send("No data found");
}

    });
});

module.exports = router;
