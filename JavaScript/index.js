async function requestSearch(){
    UF = document.getElementById("opc").value
    cidade = document.getElementById("userInput").value

    UF = UF.trim()
    cidade = cidade.trim()

    formatacaoErro = false
    erroSTRUF = ""
    erroSTRCidade = ""

    if (formatacaoErro === false){
        if (UF === ""){
            erroSTRUF = "Digite algo no campo da UF"
            formatacaoErro = true
         }
        if (cidade === ""){
            erroSTRCidade = "Digite algo no campo da cidade"
            formatacaoErro = true
        }
    }

    if (formatacaoErro == false){
        document.getElementById("userInput").style.color = "#5c65c0" //Cor de erro da caixa
        document.getElementById("error").innerHTML = ""

        const response = await fetch(`https://retour-api.herokuapp.com/search/${UF}/${cidade}`,{
            method: "GET"
        })
        const searchResult = await response.json()

        if (searchResult.error !== undefined){
            document.getElementById("userInput").style.color = "#4d0000" //Cor de erro da caixa
            document.getElementById("error").innerHTML = searchResult.error
        }
        else{
            localStorage.setItem("UF",searchResult.UF)
            localStorage.setItem("Cod_Municipio",searchResult.Cod_Municipio)
            localStorage.setItem("Municipio",searchResult.Municipio)

            window.location.replace("./html/ResultadoBusca.html")
        }
    }
    else{
        if (erroSTRUF !== ""){
            //Exibição do erro de formatação para o usuário
            document.getElementById("userInput").style.color = "#5c65c0"
            document.getElementById("opc").style.backgroundColor = "#4d0000" //Cor de erro da caixa
            document.getElementById("opc").style.color = "black"
            document.getElementById("error").innerHTML = erroSTRUF
        }
        else if(erroSTRCidade !== ""){
            document.getElementById("opc").style.backgroundColor = "#5c65c0"
            document.getElementById("userInput").style.color = "#4d0000" //Cor de erro da caixa
            document.getElementById("error").innerHTML = erroSTRCidade
        }
    }
}