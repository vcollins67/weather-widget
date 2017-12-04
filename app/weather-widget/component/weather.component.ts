import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'templates/weather.component.html',
    styleUrls: ['styles/weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {

    private pos: Position;
    private weatherData = new Weather(null, null, null, null, null);

    constructor(private service: WeatherService) { }

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
            },
            err => console.error(err));
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.humidity = weather["currently"].humidity;
                this.weatherData.summary = weather["currently"].summary;
                this.weatherData.temp = weather["currently"].temperature;
                this.weatherData.wind = weather["currently"].windSpeed;
                this.weatherData.icon = weather["currently"].icon;
                console.log("Weather: ", this.weatherData);
            },
            err => console.error(err));
    }
}