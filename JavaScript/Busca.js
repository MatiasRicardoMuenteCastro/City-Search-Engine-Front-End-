UF = localStorage.getItem("UF")
Cod_Municipio = localStorage.getItem("Cod_Municipio")
cidade = localStorage.getItem("Municipio")

urlapi = "https://retour-api.herokuapp.com"
//urlapi = "http://localhost:5000"

async function imageShow(){
    try{
        const response =  await fetch(`${urlapi}/city-image/${cidade}`,{
            method: "GET"
        })

        const image = await response.json()

        if(image.error !== undefined){
            document.getElementById("imgCidadeError").innerHTML = image.error
        }
        else{
            document.getElementById("imgCidade").src = image.success
            document.getElementById("imgCidade").style.visibility = "visible"
        }
    }catch(error){
        document.getElementById("imgCidadeError").innerHTML = "Erro no carregamento da imagem"
    }
}

async function getPopulation(){
    try{
        const response =  await fetch(`${urlapi}/population/${UF}/${Cod_Municipio}`,{
            method: "GET"
        })
        const population  = await response.json()
        
        if (population.error !== undefined){
            document.getElementById("populationError").innerHTML = population.error
        }
        else{
            document.getElementById("population").innerHTML = population.success
        }
    }catch(error){
        document.getElementById("populationError").innerHTML = "Erro no carregamento da rota"
    }
}

async function getWeather(){
    try{
        const response =  await fetch(`${urlapi}/weather/${cidade}`,{
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
    }catch(error){
        document.getElementById("climaError").innerHTML = "Erro no carregamento da rota"
    }
}

async function getEvent(){
    try{
        const response =  await fetch(`${urlapi}/events/${cidade}`,{
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

                document.getElementById("eventsList").innerHTML += `<a href = ${i.link} target = "__blank"> Link do evento</li><br>`
                document.getElementById("eventsList").innerHTML += "<br><br>"
            }
            document.getElementById("eventsList").innerHTML += `<a href = ${mais_eventos}> Mais Eventos</li><br>`
        }
    }catch(error){
        document.getElementById("eventoError").innerHTML = "Erro no carregamento da rota"
    }
}

async function getPlaces(){
    document.getElementById("placesList").innerHTML = ""
    place = document.getElementById("txtPlaces").value

    place = place.trim()

    formatacaoErro = false
    erroSTRPlace = ""

    if (formatacaoErro === false){
        if (place === ""){
            erroSTRPlace = "Digite algum lugar"
            formatacaoErro = true
         }
    }

    if (formatacaoErro == false){
        document.getElementById("txtPlaces").style.border = "1px solid"
        document.getElementById("errorCampoPlace").style.color = "#5c65c0" //Cor de erro da caixa
        document.getElementById("errorCampoPlace").innerHTML = ""

        try{
            const response =  await fetch(`${urlapi}/places/${cidade}/${place}`,{
                method: "GET"
            })
            const places  = await response.json()

            if(places.error !== undefined){
                document.getElementById("errorCampoPlace").style.color = "#b30000"
                document.getElementById("errorCampoPlace").innerHTML = places.error
                document.getElementById("txtPlaces").style.border = "2px solid #b30000"
            }
            else{
                for(let count = 0; count < 3; count++){
                    let place = places[count]

                    document.getElementById("placesList").innerHTML += `<li>Nome do lugar: ${place.title}</li><br>`
                    document.getElementById("placesList").innerHTML += `<li>Rua: ${place.address}</li><br>`
                    document.getElementById("placesList").innerHTML += `<li>Descrição: ${place.description}</li><br>`
                    document.getElementById("placesList").innerHTML += `<li>Está aberto? ${place.open_state}</li><br>`
                    document.getElementById("placesList").innerHTML += `<li><a href = "${place.website}" target = "__blank">Site do lugar</a></li><br>`
                    document.getElementById("placesList").innerHTML += `<li>Telefone: ${place.phone}</li><br>`
                    document.getElementById("placesList").innerHTML += `<li>Avaliação: ${place.rating}</li><br><br><br>`
                }
                document.getElementById("placesList").innerHTML += `<a href = "../html/ResultadoLugares.html">Ver mais</a>`
                localStorage.setItem("places",JSON.stringify(places))
            }
        }catch(error){
            document.getElementById("errorCampoPlace").style.color = "#b30000"
            document.getElementById("errorCampoPlace").innerHTML = "Erro no carregamento da rota"
        }

    }
    else{
        if (erroSTRPlace !== ""){
            //Exibição do erro de formatação para o usuário
            document.getElementById("txtPlaces").style.border = "2px solid #b30000"
            document.getElementById("errorCampoPlace").style.color = "#b30000"
            document.getElementById("errorCampoPlace").innerHTML = erroSTRPlace
        }
    }
}



getPopulation()
getWeather()
imageShow()
getEvent()
