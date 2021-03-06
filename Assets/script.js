const openWeatherAPIKey = '0a8a1f2fd6c733eb862c93d061533b6a'

let localStorageItem = 0;


for (let i=0; i < localStorage.length; i++) {
    let city = localStorage.getItem(i);
    let listDiv = $('#container');
    listDiv.append("<button class='oldSearch' value='" +city+ "'>" + city + "</button>");
}

/*Clear Button**********************************************************************************************************************************/

$('#clearBtn').on('click', function(){
    window.location.reload();
    localStorage.clear();
})

/*Search Button**********************************************************************************************************************************/

$('#searchBtn').on("click", function(){
    weatherCall();
});
    
/*Weather Call Function**************************************************************************************************************************/
function weatherCall() {
    let input = $('#searchInput').val();
    console.log(input);

    let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&Appid=" + openWeatherAPIKey + "&units=imperial";
    console.log(currentWeatherUrl);

    let fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&Appid=" + openWeatherAPIKey + "&units=imperial";
    console.log(fiveDayUrl);

    //Current Weather Call
    $.ajax({
        url: currentWeatherUrl,
        method: "GET"
    }).then(function (response) {
        let currentWeather = $("#currentWeather").append("<div>");
        currentWeather.empty();
        let currentCity = currentWeather.append('<p>');
        currentWeather.append(currentCity);

        let listDiv = $('#container');
        listDiv.append("<button class='oldSearch' value='"+response.name+"'>" + response.name + "</button>");

        localStorage.setItem(localStorageItem, response.name);
        localStorageItem++;

        //Date
        let CurrentDay = moment().format('L');

        //Temperature, Humidity, Wind Speed
        let currentTemp = currentCity.append("<p>");
        currentCity.append(currentTemp);
        currentTemp.append("<h4>" + input + " " + CurrentDay + "<h4>");
        currentTemp.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
        currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
        currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
        currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
        
        //UV Index
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let UVurl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherAPIKey + "&cnt=1";
        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (response){
           let currentUV = currentCity.append("<p class='uvIndex'>" + "UV Index: <span>" + response[0].value + "<span><p>")
           currentTemp.append(currentUV)
         });
    });

    //Five Day Forecast Call
    $.ajax({
        url: fiveDayUrl,
        method: "GET"
    }).then(function (response) {
        let fiveDays = [0, 8, 16, 24, 32];
        let fiveDayWeather = $('#fiveDayWeather')
        fiveDayWeather.empty();
                
        fiveDays.forEach(function(i) {
            let fiveDayDate = new Date(response.list[i].dt * 1000);
            fiveDayDate = fiveDayDate.toLocaleDateString("en-US");

            fiveDayWeather.append("<div class='fiveDayWeather'>" + 
                                  "<h5>" + fiveDayDate + "</h5>" + 
                                  `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` +
                                  "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" +
                                  "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" +
                                  "</div")
        })
    });
}

/*Past Searches************************************************************************************************************************************/

//function storeVar(value){
    //let city = value;
    //console.log(city);
//}

//$('.oldSearch').on('click', function(){
    //storeVar();
//});

//document.querySelector('.oldSearch')
  //.addEventListener('click', event => {
    //let target = event.target;
    //if (target.matches('button')) {
      //let value = target.innerHTML

      //console.log(value);
    //}
  //});



