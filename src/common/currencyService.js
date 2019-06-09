export const getRate = (currency) => {
    let currencies = {
        usd: 1,
        eur: 0.9,
        rub: 30
    }

    return currencies[currency]
}

export const getRandomRate = (min = 20, max = 80) => {
    return Math.floor(Math.random()*(max-min+1)+min)
}