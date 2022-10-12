UF = localStorage.getItem("UF")
Cod_Municipio = localStorage.getItem("Cod_Municipio")
cidade = localStorage.getItem("Municipio")

async function imageShow(){
    const response =  await fetch(`https://retour-api.herokuapp.com/city-image/${cidade}`,{
        method: "GET"
    })

    const image = await response.json()

    if(image.error !== undefined){
        document.getElementById("imgCidadeError").innerHTML = image.error
    }
    else{
        document.getElementById("imgCidade").src = image.success
    }
}

async function getPopulation(){
    const response =  await fetch(`https://retour-api.herokuapp.com/population/${UF}/${Cod_Municipio}`,{
        method: "GET"
    })
    const population  = await response.json()
    
    if (population.error !== undefined){
        document.getElementById("populationError").innerHTML = population.error
    }
    else{
        document.getElementById("population").innerHTML = population.success
    }
}

async function getWeather(){
    const response =  await fetch(`https://retour-api.herokuapp.com/weather/${cidade}`,{
        method: "GET"
    })
    const weather  = await response.json()

    if (weather.error !== undefined){
        document.getElementById("climaError").innerHTML = weather.error
    }
    else{
        forecast = weather.forecast
        thumbnail = weather.thumbnail
        document.getElementById("imgClima").src = thumbnail
        arrayWeather = [weather.date,weather.humidity,weather.location, weather.temperature,weather.unit,weather.weather,weather.wind]
        arrayWeatherLabel = ["Data: ","Humidade: ","Lugar: ","Temperatura: ","Tipo de medida: ","Previsão do tempo: ","Velocidade das núvens: "]
        count = 0
        for (i of arrayWeather){
                nomeClima = arrayWeatherLabel[count]
                document.getElementById("climaList").innerHTML += `<li>${nomeClima}${i}</li><br>`
                count = count+1
            }
        }
    }

async function getEvent(){
    const response =  await fetch(`https://retour-api.herokuapp.com/events/${cidade}`,{
        method: "GET"
    })
    const events = await response.json()
    if (events.error !== undefined){
        document.getElementById("eventoError").innerHTML = events.error
    }
    else{
        mais_eventos = events.Mais_Eventos
        for (i of events.Eventos){
            document.getElementById("eventsList").innerHTML += `<img id = "imgEvento" src = ${i.thumbnail} alt = "Imagem do Evento">`
            document.getElementById("eventsList").innerHTML += `<li>Nome do evento: ${i.title}</li><br>`
            document.getElementById("eventsList").innerHTML += `<li>Data de inicio: ${i.date.start_date}</li><br>`
            document.getElementById("eventsList").innerHTML += `<li>Quando?<br> ${i.date.when}</li><br><br>`
            let [Endereco, Cidade] = i.address
            document.getElementById("eventsList").innerHTML += `<li>Endereço: ${Endereco}, Cidade: ${Cidade}</li><br>`

            document.getElementById("eventsList").innerHTML += `<a href = ${i.link}> Link do evento</li><br>`
            document.getElementById("eventsList").innerHTML += "<br><br>"
        }
        document.getElementById("Mais_Eventos").href = `${mais_eventos}`
    }
}

async function getSafety(){
    const response =  await fetch(`https://retour-api.herokuapp.com/safety/${UF}/${Cod_Municipio}`,{
        method: "GET"
    })
    safety = await response.json()
    
    if(safety.error !== undefined){
        document.getElementById("seguracaError").innerHTML = safety.error
    }
    else{
        console.log(safety.ranking_mortalidade_nacional)
        console.log(safety.ranking_mortalidade_estadual)
        console.log(safety.média)

    }
}

getPopulation()
getWeather()
getSafety()
imageShow()
getSafety()
getEvent()