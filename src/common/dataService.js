import data from '../fixtures/data.json'
import goodsNames from '../fixtures/names.js'

const getName = (item) => {
    try {
        return goodsNames[item.G].B[item.T].N
    } catch {
        return 'Unknown'
    }
}

export const getGoodsData = () => {
    let avalibleGoods = data.Value.Goods

    return avalibleGoods.map(item => {
        return {
            id: item.T,
            groupId: item.G,
            name: getName(item),
            avalible: item.P,
            price: item.C,
            quantity: 1
        }
    })
}

export const getCategoriesData = () => {
    let categories = []
    
    for (let key in goodsNames) {
        categories.push({
            id: Number(key),
            name: goodsNames[key].G
        })
    }
    
    return categories
}