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
            erroSTRUF = "Selecione algo no campo do estado"
            formatacaoErro = true
         }
        if (cidade === ""){
            erroSTRCidade = "Digite algo no campo da cidade"
            formatacaoErro = true
        }
    }

    if (formatacaoErro == false){
        document.getElementById("error").style.visibility = "hidden"
        document.getElementById("userInput").style.color = "#5c65c0"
        document.getElementById("error").innerHTML = ""
        try{
            const response = await fetch(`https://retour-api.herokuapp.com/search/${UF}/${cidade}`,{
                method: "GET"
            })
            const searchResult = await response.json()

            if (searchResult.error !== undefined){
                document.getElementById("userInput").style.color = "#b30000" //Cor de erro da caixa
                document.getElementById("error").innerHTML = searchResult.error
            }
            else{
                localStorage.setItem("UF",searchResult.UF)
                localStorage.setItem("Cod_Municipio",searchResult.Cod_Municipio)
                localStorage.setItem("Municipio",searchResult.Municipio)

                window.location.replace("./html/ResultadoBusca.html")
            
            }
        }catch(error){
            document.getElementById("error").innerHTML = "Erro no carregamento da rota"
            document.getElementById("userInput").style.border = "1px solid #b30000"
        }
    }

    else{
        if (erroSTRUF !== ""){
            //Exibição do erro de formatação para o usuário
            document.getElementById("error").style.visibility = "visible"
            document.getElementById("error").innerHTML = erroSTRUF
        }
        else if(erroSTRCidade !== ""){
            document.getElementById("opc").style.backgroundColor = "#5c65c0"
            document.getElementById("userInput").style.color = "#b30000" //Cor de erro da caixa
            document.getElementById("error").innerHTML = erroSTRCidade
        }
    }
}