const apiKey = 'fb51cb6a5bfb9b2da08d7543001657af'

const card = document.querySelector(".card")
const searchBox = document.querySelector(".card-input")
const searchBtn = document.querySelector("#SearchBtn")
const temp = document.querySelector(".card-title--temp")
const cityName = document.querySelector("#city")
const humidity = document.querySelector("#humidity")
const wind = document.querySelector("#wind")
const icon = document.querySelector(".card-weather-icon")
const date = document.querySelector("#date")

const showDate = () => {
    const now = new Date()
    const day = now.getDate()
    const monthName = now.toLocaleString('en', {month: "long"})
    date.innerHTML = `${day} ${monthName}`
}


async function getWeather(city) {
    city = city.trim()
    if (!city) return

    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

        if (!response.ok) {
            throw new Error("Город не найден")
        }

        const result = await response.json()
        console.log(result)
        card.classList.add("active")
        card.style.height = "530px"

        const iconUrl = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`
        icon.src = iconUrl

        cityName.innerHTML = result.name
        humidity.innerHTML = `${result.main.humidity}`
        wind.innerHTML = `${result.wind.speed}`
        temp.innerHTML = `${Math.round(result.main.temp)}°C`
    }
    catch (err){
        alert(err)
    }
}


searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value)
})


searchBox.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        getWeather(searchBox.value)
    }
})

document.addEventListener("click", (event) => {
    if (card.classList.contains("active") && !card.contains(event.target)) {
        card.classList.remove("active")
        card.style.height = "230px"
        searchBox.value = ""
    }
})


showDate()