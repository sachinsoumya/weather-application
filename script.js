
// console.log( document.querySelector(".tem"));

prnt = document.querySelector(".parent");
tem = document.querySelector(".tem");
dateOutput = document.querySelector(".dati");
cities = document.querySelectorAll(".city");
tym = document.querySelector(".time");
conditionOutput = document.querySelector(".nature");
namOutput = document.querySelector(".plc");
icon = document.querySelector(".icn");
humidityOutput = document.querySelector(".humidity");
cloudOutput = document.querySelector(".cloudy");
windOutput = document.querySelector(".wind");
minOutput = document.querySelector(".min");
maxOutput = document.querySelector(".max");
searchInput = document.querySelector(".form-control");
search = document.querySelector(".btn");
formOut = document.getElementById("locationInput");
pressOutput = document.querySelector(".press");
// cityInput = "Balasore";

//  namOutput.innerHTML = cityInput;

    hours = new Date().getHours();
    minutes = new Date().getMinutes();
    year = new Date().getFullYear();
    month =new Date().getMonth();
    date = new Date().getDate();
    getDay = dayOfweek(date , month ,year);
    tym.innerHTML = `${hours}:${minutes.toString().length==1?"0"+minutes:minutes}`;
    dateOutput.innerHTML = `${getDay} 0${date}.0${month+1} ${year}`


   window.addEventListener('load' , (e)=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((data)=>{
            console.log(data);
            lat = data.coords.latitude;
            long = data.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ac00963ad5cd53d1d202d4032293560d&units=metric`,{ method: "GET" })
            .then(res=>res.json())
            .then(result =>{
                console.log(result);
                showweatherReport(result);
            })
        })
    }else{
        console.log('Location is supported');
    }
   })

   cities.forEach((city) => {
    console.log(city);
     city.addEventListener('click' , (e)=>{
        console.log("Hello");

       cityInput = e.target.innerHTML;
         fetchWeatherData(cityInput);
         
     });
    
});

search.addEventListener("click", (e)=>{
    if(searchInput.value.length == 0){
        alert("please type the name");
    }else{
        // console.log(searchInput.value);
        fetchWeatherData(searchInput.value);
    }
})

function dayOfweek (day , month , year){
    const week = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
    return week[new Date(`${year}-${month}-${day}`).getDay()];

};

function fetchWeatherData(cityInput){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=ac00963ad5cd53d1d202d4032293560d&units=metric`)
    .then(response =>response.json())
    .then(data=>{
        console.log(data);
        showweatherReport(data);
    })
    .catch((error)=>{
      console.log(error.message);
    })
}
  function showweatherReport(data) {
    tem.innerHTML = data.main.temp+"&deg;C";
    conditionOutput.innerHTML = data.weather[0].main;
    namOutput.innerHTML = data.name+","+ `${data.sys.country==undefined?"No Country":data.sys.country}`;
    if(conditionOutput.innerHTML == 'Haze'){
      icon.innerHTML = `<i class="bi bi-cloud-haze-fill fs-1"></i>`
      prnt.style.backgroundImage = "url('./images/Haze.avif')"
    }
    else if(conditionOutput.innerHTML == 'Sunny'){
        icon.innerHTML = `<i class="bi bi-sun fs-1"></i>`
        prnt.style.backgroundImage = "url('./images/sunnyImage.avif')"
    }
    else if(conditionOutput.innerHTML == 'Smoke'){
        icon.innerHTML = `<i class="bi bi-cloud-fog fs-1"></i>`
        prnt.style.backgroundImage = "url('./images/newsmokeImage.avif')"
    }
    else if(conditionOutput.innerHTML == 'Rain'){
        icon.innerHTML = `<i class="bi bi-cloud-lightning-rain fs-1"></i>`
        prnt.style.backgroundImage = "url('./images/rainImage.avif')"
    }
    else if(conditionOutput.innerHTML == 'Snow'){
        icon.innerHTML = `<i class="bi bi-cloud-snow fs-1"></i>`
        prnt.style.backgroundImage = "url('./images/snowImage.avif')"
    }
    else if(conditionOutput.innerHTML == 'Thunderstorm'){
        icon.innerHTML = `<i class="bi bi-cloud-fog fs-1"></i>`
        prnt.style.backgroundImage = "url('./images/thunderImage.avif')"
    }
    
    else if(conditionOutput.innerHTML == 'Clouds'){
        icon.innerHTML = `<i class="bi bi-cloud-fill fs-1"></i>`
        prnt.style.backgroundImage = "url('./images/cloudImage.avif')"
    }
    else if(conditionOutput.innerHTML == 'Mist'){
        icon.innerHTML = `<i class="bi bi-cloud-hail"></i>`
        prnt.style.backgroundImage = "url('./images/mistImage.avif')"
    }
    else{
        icon.innerHTML = `<i class="bi bi-stars fs-1"></i>`
        prnt.style.backgroundImage = "url('./images/newdefaultImage.avif')"
    }

    humidityOutput.innerHTML = data.main.humidity+"%";
    cloudOutput.innerHTML = data.clouds.all+"%";
    windOutput.innerHTML = data.wind.speed+"%";
    minOutput.innerHTML =data.main.temp_max+"&deg;C";
    maxOutput.innerHTML = data.main.temp_min+"&deg;C";
    pressOutput.innerHTML = data.main.pressure+"Pa";
}















