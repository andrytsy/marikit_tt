import { getGoodsData, getCategoriesData } from '../common/dataService'
import { getRate, getRandomRate } from '../common/currencyService'
import { FETCH_DATA, FETCH_CURRENCY_RATE } from './actions.type'
import {
    SET_GOODS,
    SET_CATEGORIES,
    SET_CURRENCY_RATE,
    ADD_TO_BASKET,
    REMOVE_FROM_BASKET,
    CHANGE_CURRENCY,
    SET_QUANTITY 
} from './mutations.type'

const state = { 
    goods: [],
    categories: [],
    basket: [],
    currency: 'rub',
    currencyRate: 50,
    oldRate: 50
}

const getters = {
    goods: (state) => {
        return state.goods
    },
    categories: (state) => {
        return state.categories
    },
    basket: (state) => {
        return state.basket
    },
    currency: (state) => {
        return state.currency
    },
    currencyRate: (state) => {
        return state.currencyRate
    },
    oldRate: (state) => {
        return state.oldRate
    },
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
    getSum: (state, getters) => {
        let sum = getters.getGoodsWithCurrentPrice(state.basket).reduce((result, good) => {
            return result += (Number(good.price) * good.quantity)
        }, 0)

        return sum.toFixed(2)
    }
}

const actions = {
    [FETCH_DATA]({ commit }) {
        commit(SET_GOODS, getGoodsData())
        commit(SET_CATEGORIES, getCategoriesData())
    },
    [FETCH_CURRENCY_RATE]({ commit }) {
        commit(SET_CURRENCY_RATE, getRandomRate())
    }
}

const mutations = {
    [SET_GOODS](state, data) {
        state.goods.length = 0
        Array.prototype.push.apply(state.goods, data)
    },
    [SET_CATEGORIES](state, data) {
        state.categories.length = 0
        Array.prototype.push.apply(state.categories, data)
    },
    [SET_CURRENCY_RATE](state, currencyRate) {
        if (state.currency === 'rub') {
            state.oldRate = state.currencyRate
            state.currencyRate = currencyRate
        }
    },
    [ADD_TO_BASKET](state, good) {
        let index = state.basket.findIndex(item => item.id === good.id)
        
        if (~index)
            state.basket[index].quantity += 1
        else
            state.basket.push(good)
    },
    [REMOVE_FROM_BASKET](state, id) {
        let index = state.basket.findIndex(item => item.id === id)
        state.basket.splice(index, 1)
    },
    [CHANGE_CURRENCY](state, currency) {
        state.currencyRate = getRate(currency)
        state.currency = currency
    },
    [SET_QUANTITY](state, good) {
        let index = state.basket.findIndex(item => item.id === good.id)
        state.basket[index].quantity = parseInt(good.quantity)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}