const places = localStorage.getItem("places")
const placesObj = JSON.parse(places)

document.getElementById("ulPlacesID").innerHTML = ""

for (place of placesObj){
    document.getElementById("ulPlacesID").innerHTML += `<li><img src = "${place.thumbnail}"></li>`
    document.getElementById("ulPlacesID").innerHTML += `<li>Tipo do Estabelecimento: ${place.type}</li>`
    document.getElementById("ulPlacesID").innerHTML += `<li>Recomendação Nº: ${place.position}</li>`
    document.getElementById("ulPlacesID").innerHTML += `<li>Nome: ${place.title}</li>`
    document.getElementById("ulPlacesID").innerHTML += `<li>Endereço: ${place.address}</li>`
    document.getElementById("ulPlacesID").innerHTML += `<li>Descrição: ${place.description}</li>`
    document.getElementById("ulPlacesID").innerHTML += `<li>Está aberto?<br>${place.open_state}</li>`
    document.getElementById("ulPlacesID").innerHTML += `<li>Telefone: ${place.phone}</li>`
    document.getElementById("ulPlacesID").innerHTML += `<li>Nota: ${place.rating}</li>`
    document.getElementById("ulPlacesID").innerHTML += `<li>Avaliações: ${place.reviews}</li>`
    document.getElementById("ulPlacesID").innerHTML += `<li><a href ="${place.website}" target = "__blank">Site</a></li>`
}