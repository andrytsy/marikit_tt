import Vue from "vue"
import Vuex from "vuex"
import data from '../fixtures/data.json'
import goodsNames from '../fixtures/names.js'

Vue.use(Vuex)

function getName() {
    try {
        return goodsNames[this.G].B[this.T].N
    } catch {
        return 'Unknown'
    }
}

function getPrepareData() {
    let avalibleGoods = data.Value.Goods

    return avalibleGoods.map(item => {
        return {
            id: item.T,
            groupId: item.G,
            name: getName.call(item),
            avalible: item.P,
            price: item.C
        }
    })
}

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
        basket: []
    },
    getters: {
        getGoodsByGroupId: (state) => (id) => {
            return state.goods.filter(item => item.groupId === id)
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
