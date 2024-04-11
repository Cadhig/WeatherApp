// Api fetch
async function fetchdata() {

    try {
        // link to input in html
        const location = document.getElementById("LocationInput").value;
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=9bf1da022bd331ad487f568dd4ea6f34`)
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
        // grab the weather at 12pm each day for 5 days
        for (let i = 3; i < listArray.length; i = i + 8) {
            console.log(i)
        }

        // grab weather info from objects in array

        // use info in object and assign values to html

        // find api call for today's weather


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