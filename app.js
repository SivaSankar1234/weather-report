 const apiKey = "609208b6d272befd85b3fbcd4aaeb21f";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
  
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


async function getWeatherByLocation(city){
     
         const resp = await fetch(url(city), {
             origin: "cors" });
         const respData = await resp.json();
     
           addWeatherToPage(respData,city);
          
     }

      function addWeatherToPage(data,city){
          const temp = Ktoc(data.main.temp);
          const humd=data.main.humidity;
          const pressure=data.main.pressure;
          const wind=data.wind.speed;
         

          const weather = document.createElement('div')
          weather.classList.add('weather');

          weather.innerHTML = `
          <h3>${city}</h3>
          <h2><img class="weather-img" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <h4>Wind: ${wind} km/hr </h4> 
         <h4>Humidity: ${humd} %</h4> 
         <h4>Pressure: ${pressure}</h4> 
         
          <small>${data.weather[0].main}</small>
          
          `;


        //   cleanup 
          main.innerHTML= "";
           main.appendChild(weather);
      };


     function Ktoc(K){
         return Math.floor(K - 273.15);
     }



     form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const city = search.value;

        if(city){
            getWeatherByLocation(city)
        }

     });


