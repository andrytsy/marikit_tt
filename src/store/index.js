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
            price: (item.C * getCurrency()).toFixed(2),
            quantity: 1
        }
    })
}

function getCurrency() {
    return randomFromInterval()
}

function randomFromInterval(min = 20, max = 80) {
    return Math.floor(Math.random()*(max-min+1)+min)
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

const store = new Vuex.Store({
    state: { 
        goods: [],
        categories: [],
        basket: [],
        currency: 'usd'
    },
    getters: {
        getGoodsByGroupId: (state) => (id) => {
            return state.goods.filter(item => item.groupId === id)
        },
        getBasketSum: (state) => {
            return state.basket.reduce((result, good) => {
                return result += Number(good.price)
            }, 0)
        },

        // todo KISS
        getGoodsFromBasket: (state) => {
            if (!state.basket.length) return []
            
            let goods = state.basket.reduce((result, item) => {
                return result.includes(item) ? result : [...result, item] 
            }, [])

            return goods.map(item => {
                return {
                    ...item,
                    quantity: state.basket.filter(_item => _item.id === item.id).length
                }
            })
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
            state.basket.push(good)
        },
        removeFromBasket(state, id) {
            let index = state.basket.findIndex(item => item.id === id)
            state.basket.splice(index, 1)
        }
    },
    actions: {
        fetchData({ commit }) {
            commit('setGoods', getPrepareData())
            commit('setCategories', getCategories())
        }
    }
})

window.store = store

export default store
