import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-clima-main',
  templateUrl: './clima-main.component.html',
  styleUrls: ['./clima-main.component.css'],
})


export class ClimaMainComponent {

  WeatherData:any;
  WeatherFiveData:any;
  myControl = new FormControl('');
  api_id: string = '563e19a9b424be7608f73c40b5a9b13e'
  options: string[] = ['Flores da Cunha', 'Caxias do Sul', 'Farroupilha']
  local: string  

  constructor() {
    
  }

  ngOnInit() {
    
    this.WeatherData = {
      main : {},
      isDay: true
    };
    
    this.WeatherFiveData = {
      lat : 44.34,
      lon: 10.99
    };     

    this.getWeatherData('flores da cunha');
    
  }

  

  getWeatherData(local:string) {   
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&appid=${this.api_id}`)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
    
  }

  setWeatherData(data:any){
    this.WeatherData = data; 
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.description = (this.WeatherData.weather[0].description)
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

    

    this.WeatherData.icon = (`http://openweathermap.org/img/wn/${this.WeatherData.weather[0].icon}@2x.png`)

    this.WeatherData.lat = (this.WeatherData.coord.lat).toFixed(2)
    this.WeatherData.lon = (this.WeatherData.coord.lon).toFixed(2 )

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.WeatherData.lat}&lon=${this.WeatherData.lon}&lang=pt_br&appid=${this.api_id}`)
    .then(response=>response.json())
    .then(data=>{this.setWeatherFiveData(data);}) 
  }


  setWeatherFiveData(data:any){
    this.WeatherFiveData = data
    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    

    this.WeatherFiveData.day = [semana[new Date(this.WeatherFiveData.list[7].dt_txt).getDay()], semana[new Date(this.WeatherFiveData.list[14].dt_txt).getDay()], semana[new Date(this.WeatherFiveData.list[22].dt_txt).getDay()], semana[new Date(this.WeatherFiveData.list[30].dt_txt).getDay()], semana[new Date(this.WeatherFiveData.list[38].dt_txt).getDay()]]

    this.WeatherFiveData.icon = [`http://openweathermap.org/img/wn/${this.WeatherFiveData.list[7].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${this.WeatherFiveData.list[15].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${this.WeatherFiveData.list[23].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${this.WeatherFiveData.list[31].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${this.WeatherFiveData.list[39].weather[0].icon}@2x.png`]

    this.WeatherFiveData.temp_min = [(this.WeatherFiveData.list[7].main.temp_min - 273.15).toFixed(0), (this.WeatherFiveData.list[15].main.temp_min - 273.15).toFixed(0), (this.WeatherFiveData.list[23].main.temp_min - 273.15).toFixed(0), (this.WeatherFiveData.list[31].main.temp_min - 273.15).toFixed(0), (this.WeatherFiveData.list[39].main.temp_min - 273.15).toFixed(0)]

    this.WeatherFiveData.temp_max = [(this.WeatherFiveData.list[7].main.temp_max - 273.15).toFixed(0), (this.WeatherFiveData.list[15].main.temp_max - 273.15).toFixed(0), (this.WeatherFiveData.list[23].main.temp_max - 273.15).toFixed(0), (this.WeatherFiveData.list[31].main.temp_max - 273.15).toFixed(0), (this.WeatherFiveData.list[39].main.temp_max - 273.15).toFixed(0)]

    this.WeatherFiveData.description = [this.WeatherFiveData.list[7].weather[0].description, this.WeatherFiveData.list[15].weather[0].description, this.WeatherFiveData.list[23].weather[0].description, this.WeatherFiveData.list[31].weather[0].description, this.WeatherFiveData.list[39].weather[0].description]
  
  }
}


