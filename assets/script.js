

// Api fetch

async function fetchdata(cities) {
    try {
        const weatherCard = document.getElementById('weatherCard')
        weatherCard.innerHTML = ""

        const container = document.getElementById('city-container')
        container.innerHTML = ""


        // link to input in html
        const location = cities || document.getElementById("LocationInput").value;
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=9bf1da022bd331ad487f568dd4ea6f34`)
        console.log(response)
        // throws error if invalid
        if (!response.ok) {
            throw new error("Could not Fetch")
        }
        // converts fetch to json
        const data = await response.json();
        console.log(data)

        // grab the object from data array
        const weatherObj = data[0]
        // grabs lat & long variables from object
        const weatherLat = weatherObj.lat
        const weatherLon = weatherObj.lon

        // Current Weather
        const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${weatherLat}&lon=${weatherLon}&appid=9bf1da022bd331ad487f568dd4ea6f34&units=imperial`)
        // throws error if invalid
        if (!currentWeather.ok) {
            throw new error("Could not Fetch")
        }
        // convert fetch to json
        const currentWeatherJson = await currentWeather.json()
        console.log(currentWeatherJson)

        const currentHead = document.getElementById('localWeather')
        let date = dayjs().format('dddd M/D')
        console.log(date)
        currentHead.textContent = `${currentWeatherJson.name} | ${date}`
        const currentIcon = document.getElementById('icon')
        currentIcon.src = (`https://openweathermap.org/img/wn/${currentWeatherJson.weather[0].icon}@2x.png`)
        const currentTemp = document.getElementById('temp')
        currentTemp.textContent = `Temp: ${currentWeatherJson.main.temp} °F`
        const currentHumidity = document.getElementById('humidity')
        currentHumidity.textContent = `Humidity: ${currentWeatherJson.main.humidity}%`
        const currentWind = document.getElementById('wind')
        currentWind.textContent = `Wind: ${currentWeatherJson.wind.speed} MPH`

        // local storage
        let storedCities = []
        if (localStorage.getItem("city") !== null) {
            storedCities = JSON.parse(localStorage.getItem("city"))
        }
        if (storedCities.includes(currentWeatherJson.name) == false) {
            storedCities.push(currentWeatherJson.name)
        }
        const stringifiedCities = JSON.stringify(storedCities)
        localStorage.setItem("city", stringifiedCities)

        // sidebar
        for (let i = 0; i < storedCities.length; i++) {
            const cities = storedCities[i]
            const container = document.getElementById('city-container')
            const cityButton = document.createElement('button')
            cityButton.setAttribute('id', 'city-buttons')
            cityButton.textContent = cities
            cityButton.onclick = () => fetchdata(cities)

            container.appendChild(cityButton)
        }

        // Weather forecast cards
        // uses above values to grab weather from API
        const weatherLocation = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${weatherLat}&lon=${weatherLon}&appid=9bf1da022bd331ad487f568dd4ea6f34&units=imperial`)

        // throws error if invalid
        if (!weatherLocation.ok) {
            throw new error("Could not Fetch")
        }
        // convert fetch to json
        const weatherJson = await weatherLocation.json()
        console.log(weatherJson)
        // grab list array from object
        const listArray = weatherJson.list

        let startIndex = 0
        for (let i = 0; i < listArray.length; i++) {
            let forecastTime = listArray[i].dt_txt.split(' ')[1]
            if (forecastTime == "12:00:00") {
                startIndex = i
                break
            }
        }
        // grab the weather each day for 5 days
        for (let i = startIndex; i < listArray.length; i = i + 8) {
            const dailyWeather = listArray[i]
            const weatherCardBody = document.getElementById('weatherCard')
            const weatherCard = document.createElement('div')
            const date = document.createElement('h2')
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const d = new Date(dailyWeather.dt_txt);
            date.textContent = `${days[d.getDay()]} ${d.getMonth() + 1}/${d.getDate()}`
            const icon = document.createElement('img')
            icon.src = (`https://openweathermap.org/img/wn/${dailyWeather.weather[0].icon}@2x.png`)
            const temp = document.createElement('p')
            temp.textContent = (`Temp: ${dailyWeather.main.temp} °F`)
            const humidity = document.createElement('p')
            humidity.textContent = (`Humidity: ${dailyWeather.main.humidity}%`)
            const windSpeed = document.createElement('p')
            windSpeed.textContent = (`Wind: ${dailyWeather.wind.speed} MPH`)

            // appending created elements
            weatherCard.appendChild(date)
            weatherCard.appendChild(icon)
            weatherCard.appendChild(temp)
            weatherCard.appendChild(humidity)
            weatherCard.appendChild(windSpeed)
            weatherCardBody.appendChild(weatherCard)
        }
        const forecastTitle = document.getElementById('forecast-title')
        forecastTitle.innerHTML = ""
        const forecastHead = document.createElement('h1')
        forecastHead.textContent = '5 Day Forecast'
        forecastTitle.appendChild(forecastHead)
    }
    catch (error) {
        console.error(error)
    }
}



// function thenFetch() {
//     const location = document.getElementById("LocationInput").value;
//     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=9bf1da022bd331ad487f568dd4ea6f34`)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new error('error')
//             }
//             response.json().then((responseJson) => {
//                 const arrayObj = responseJson[0]
//                 const weatherLat = arrayObj.lat
//                 const weatherLon = arrayObj.lon
//                 fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${weatherLat}&lon=${weatherLon}&appid=9bf1da022bd331ad487f568dd4ea6f34`).then((weatherResponse) => {
//                     if (!weatherResponse.ok) {
//                         throw new error("Could not Fetch")
//                     }
//                     weatherResponse.json().then((weatherJson) => {
//                         console.log(weatherJson)
//                     })
//                 })
//             })
//         })
//         .catch(error => console.error(error))
// }