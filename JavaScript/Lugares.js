const places = localStorage.getItem("places")

if(places === null){
    window.location.replace("../html/ResultadoBusca.html")
}

const placesObj = JSON.parse(places)

document.getElementById("ulPlacesID").innerHTML = ""

count = 0

for (place of placesObj){
    if(place.title !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasseTitulo" id = "listaLugaresID${count}">${place.title}</li><br><br>`
    }
    count = count+1
    if(place.thumbnail !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasseImg" id = "listaLugaresID${count}"><img src = "${place.thumbnail}"></li><br><br><br>`
    }
    count = count+1
    if(place.type !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Tipo do Estabelecimento: ${place.type}</li>`
    }
    count = count+1
    if(place.position !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Recomendação Nº: ${place.position}</li>`
    }
    count = count+1
    if(place.address !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Endereço: ${place.address}</li>`
    }
    count = count+1
    if(place.description !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Descrição: ${place.description}</li>`
    }
    count = count+1
    if(place.open_state !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Está aberto?<br>${place.open_state}</li>`
    }
    count = count+1
    if(place.phone !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Telefone: ${place.phone}</li>`
    }
        count = count+1
    if(place.rating !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Nota: ${place.rating}</li>`
    }
    count = count+1
    if(place.reviews !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Avaliações: ${place.reviews.toLocaleString('pt-BR')}</li>`
    }
    count = count+1
    if(place.website !== undefined){
        document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasseLink" id = "listaLugaresID${count}"><a class="linksite" href ="${place.website}" target = "__blank">Site do Local</a></li><br><br><br><br>`
    }
    count = count+1
}