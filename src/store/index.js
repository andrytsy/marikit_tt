import Vue from "vue"
import Vuex from "vuex"
import data from '../fixtures/data.json'
import goodsNames from '../fixtures/names.js'

Vue.use(Vuex)

// todo why here ???
function getName() {
    try {
        return goodsNames[this.G].B[this.T].N
    } catch {
        return 'Unknown'
    }
}

// todo why here ???
function getPrepareData() {
    let avalibleGoods = data.Value.Goods

    return avalibleGoods.map(item => {
        return {
            id: item.T,
            groupId: item.G,
            name: getName.call(item),
            avalible: item.P,
            price: item.C,
            quantity: 1
        }
    })
}



// todo why here ???
function getCategories() {
    let categories = []
    
    for (let key in goodsNames) {
        categories.push({
            id: Number(key),
            name: goodsNames[key].G
        })
    }
    
    return categories
}

function getRate(currency) {
    let currencies = {
        usd: 1,
        eur: 0.9,
        rub: getCurrency()
    }

    return currencies[currency]
}

function getCurrency() {
    return randomFromInterval()
}

function randomFromInterval(min = 20, max = 80) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

const store = new Vuex.Store({
    state: { 
        goods: [],
        categories: [],
        basket: [],
        currency: 'usd',
        currencyRate: 1
    },
    getters: {
        getGoodsByGroupId: (state, getters) => (id) => {
            return getters.getGoodsWithCurrentPrice(state.goods).filter(item => item.groupId === id)
        },
        getGoodsWithCurrentPrice: (state, getters) => (goodsArr) => {
            return goodsArr.map(item => {
                return {
                    ...item,
                    price: getters.getPrice(item) 
                }
            })
        },
        getPrice: (state) => (item) => {
            return (item.price * state.currencyRate).toFixed(2)
        },
        getGoodsInBasketQuantity: (state) => {
            return state.basket.reduce((quantity, item) => {
                return quantity + item.quantity
            }, 0)
        },
        getGoodsFromBasket: (state, getters) => {
            return getters.getGoodsWithCurrentPrice(state.basket)
        },
        getBasketSum: (state, getters) => {
            let sum = getters.getGoodsWithCurrentPrice(state.basket).reduce((result, good) => {
                return result += (Number(good.price) * good.quantity)
            }, 0)

            return sum.toFixed(2)
        }
    },
    mutations: {
        setGoods(state, data) {
            state.goods.length = 0
            Array.prototype.push.apply(state.goods, data)
        },
        setCategories(state, data) {
            state.categories.length = 0
            Array.prototype.push.apply(state.categories, data)
        },
        addToBasket(state, good) {
            let index = state.basket.findIndex(item => item.id === good.id)
            
            if (~index)
                state.basket[index].quantity += 1
            else
                state.basket.push(good)
        },
        removeFromBasket(state, id) {
            let index = state.basket.findIndex(item => item.id === id)
            state.basket.splice(index, 1)
        },
        changeCurrency(state, currency) {
            state.currencyRate = getRate(currency)
            state.currency = currency
        },
        setQuantity(state, good) {
            let index = state.basket.findIndex(item => item.id === good.id)
            state.basket[index].quantity = parseInt(good.quantity)
        }
    },
    actions: {
        fetchData({ commit }) {
            commit('setGoods', getPrepareData())
            commit('setCategories', getCategories())
        }
    }
})

export default store
