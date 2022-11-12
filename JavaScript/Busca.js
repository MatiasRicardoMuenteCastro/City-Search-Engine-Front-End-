UF = localStorage.getItem("UF")
Cod_Municipio = localStorage.getItem("Cod_Municipio")
cidade = localStorage.getItem("Municipio")

urlapi = "https://retour-api.herokuapp.com"
//urlapi = "http://localhost:5000"

document.getElementById("pesquisaList").innerHTML += `<li id = "CidadeInfo"> ${cidade} - ${UF}</li><br>`

async function imageShow(){
    try{
        console.log(`${urlapi}/city-image/${cidade}/${UF}`)
        const response =  await fetch(`${urlapi}/city-image/${cidade}/${UF}`,{
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
                arrayWeather = [weather.date,weather.humidity, weather.temperature,weather.unit,weather.weather,weather.wind]
                arrayWeatherLabel = ["Data: ","Humidade: ","Temperatura: ","Tipo de medida: ","Previsão do tempo: ","Velocidade das núvens: "]
                count = 0
                for (i of arrayWeather){
                        nomeClima = arrayWeatherLabel[count]
                        document.getElementById("climaList").innerHTML += `<li class="climalinha">${nomeClima}${i}</li><br>`
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
            countID = 0
            for (i of events.Eventos){
                document.getElementById("eventsList").innerHTML += `<img class = "imgEvento" id = "imgEvento${countID}" src = ${i.thumbnail} alt = "Imagem do Evento">`
                countID = countID+1
                document.getElementById("eventsList").innerHTML += `<li class = "classeLIEventos" id = "IDLIEventos${countID}"> ${i.title}</li><br>`
                countID = countID+1
                document.getElementById("eventsList").innerHTML += `<br><li class = "classeLIEventos" id = "IDLIEventos${countID}">Data de inicio: ${i.date.start_date}</li><br>`
                countID = countID+1
                document.getElementById("eventsList").innerHTML += `<li class = "classeLIEventos" id = "IDLIEventos${countID}">Quando?<br> ${i.date.when}</li><br><br>`
                countID = countID+1
                let [Endereco, Cidade] = i.address
                document.getElementById("eventsList").innerHTML += `<li class = "classeLIEventos" id = "IDLIEventos${countID}">Endereço: ${Endereco}, Cidade: ${Cidade}</li><br>`
                countID = countID+1

                document.getElementById("eventsList").innerHTML += `<li class = "classeLIEventos" id = "IDLIEventos${countID}"><a href = ${i.link} target = "__blank"> Link do evento</a></li><br>`
                countID = countID+1
                document.getElementById("eventsList").innerHTML += "<br><br>"

            }
            document.getElementById("eventsList").innerHTML += `<a class = "maiseventos" href = ${mais_eventos} target = __blank> MAIS EVENTOS </li><br>`
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
                countID = 0
                for(let count = 0; count < 3; count++){
                    let place = places[count]

                    document.getElementById("placesList").innerHTML += `<li class = "classeLILugares" id = "IDLILugares${countID}">${place.title}</li><br>`
                    countID = countID+1
                    document.getElementById("placesList").innerHTML += `<li class = "classeLILugares" id = "IDLILugares${countID}">Rua: ${place.address}</li><br>`
                    countID = countID+1
                    document.getElementById("placesList").innerHTML += `<li class = "classeLILugares" id = "IDLILugares${countID}">Descrição: ${place.description}</li><br>`
                    countID = countID+1
                    document.getElementById("placesList").innerHTML += `<li class = "classeLILugares" id = "IDLILugares${countID}">Está aberto? ${place.open_state}</li><br>`
                    countID = countID+1
                    document.getElementById("placesList").innerHTML += `<li class = "classeLILugares" id = "IDLILugares${countID}">Telefone: ${place.phone}</li><br>`
                    countID = countID+1
                    document.getElementById("placesList").innerHTML += `<li class = "classeLILugares" id = "IDLILugares${countID}">Avaliação: ${place.rating}</li><br><br><br>`
                    countID = countID+1
                    document.getElementById("placesList").innerHTML += `<li class = "classeLILugares" id = "IDLILugares${countID}"><a class="sitelugar" href = "${place.website}" target = "__blank">Site do lugar</a></li><br><br><br>`
                    countID = countID+1                    
                }
                document.getElementById("placesList").innerHTML += `<a class = "maislugares" href = "../html/ResultadoLugares.html" target="_blank">VER MAIS</a>`
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
