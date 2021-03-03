const openWeatherAPIKey = '0a8a1f2fd6c733eb862c93d061533b6a'

/*Search Button************************************************/

$('#searchBtn').on("click", function(){
    let input = $('#searchInput').val();
    console.log(input);

    let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&Appid=" + openWeatherAPIKey + "&units=imperial";
    console.log(currentWeatherUrl);

    let fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&Appid=" + openWeatherAPIKey + "&units=imperial";
    console.log(fiveDayUrl);
});


