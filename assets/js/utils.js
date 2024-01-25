function capitalizeCase(text){
    let primeiraLetra = text.charAt(0)
    let restantePalavra = text.slice(1)
    return `${primeiraLetra.toUpperCase()}${restantePalavra}`
}