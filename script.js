











async function fetchdata() {

    try {
        const location = document.getElementById("LocationInput").value;
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=9bf1da022bd331ad487f568dd4ea6f34`)
        console.log(response)
        if (!response.ok) {
            throw new error("Could not Fetch")
        }
        const data = await response.json();
        console.log(data)

    }
    catch (error) {
        console.error(error)
    }
}

// fetch("http://api.openweathermap.org/geo/1.0/zip?zip=77020&appid=9bf1da022bd331ad487f568dd4ea6f34")
//     .then(response => {

//         const location = document.getElementById("LocationInput")
//         if (!response.ok) {
//             throw new error("Could not Fetch")
//         }
//         return response.json()
//     })
//     .then(data => console.log(data))
//     .catch(error => console.error(error))

// fetch("https://api.openweathermap.org/data/2.5/forecast?lat=29.7604&lon=-95.3698&appid=9bf1da022bd331ad487f568dd4ea6f34")
//     .then(response => {

//         if (!response.ok) {
//             throw new error("Could not Fetch")
//         }
//         return response.json()
//     })
//     .then(data => console.log(data))
//     .catch(error => console.error(error))
