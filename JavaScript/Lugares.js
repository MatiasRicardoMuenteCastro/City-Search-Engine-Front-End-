const places = localStorage.getItem("places")
const placesObj = JSON.parse(places)

document.getElementById("ulPlacesID").innerHTML = ""

count = 0

for (place of placesObj){
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasseTitulo" id = "listaLugaresID${count}">${place.title}</li><br><br>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasseImg" id = "listaLugaresID${count}"><img src = "${place.thumbnail}"></li>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Tipo do Estabelecimento: ${place.type}</li>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Recomendação Nº: ${place.position}</li>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Endereço: ${place.address}</li>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Descrição: ${place.description}</li>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Está aberto?<br>${place.open_state}</li>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Telefone: ${place.phone}</li>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Nota: ${place.rating}</li>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasse" id = "listaLugaresID${count}">Avaliações: ${place.reviews}</li>`
    count = count+1
    document.getElementById("ulPlacesID").innerHTML += `<li class = "listaLugaresClasseLink" id = "listaLugaresID${count}"><a class="linksite" href ="${place.website}" target = "__blank">Site do Local</a></li><br><br><br><br>`
    count = count+1
}