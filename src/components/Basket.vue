<template>
    <table class="basket">
        <thead>
            <tr class="basket__header">
                <th>Наименование товара и описание</th>
                <th>Количество</th>
                <th>Цена</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr class="basket__item" v-for="good in getGoodsFromBasket" v-bind:key="good.id">
                <td>
                    {{ good.name }}
                </td>
                <td>
                    <input type="number" id="" min="1" v-model="good.quantity" v-on:input="chageQuantity(good)">
                </td>
                <td>
                    {{ good.price }}
                    <span class="basket__item__small-text">/шт.</span>
                </td>
                <td>
                    <span class="basket__item__remove-btn" v-on:click="removeFromBasket(good.id)">
                        Удалить
                    </span>
                </td>
            </tr>
            <tr>
                <td colspan="4" class="basket__sum">
                    Общая стоимость: {{ getSum }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex'
import { REMOVE_FROM_BASKET, SET_QUANTITY } from '../store/mutations.type'

export default {
    name: 'Basket',
    computed: mapGetters([ 'getGoodsFromBasket', 'getSum' ]),
    methods: {
        removeFromBasket(id) {
            this.$store.commit(REMOVE_FROM_BASKET, id)
        },
        chageQuantity(item) {
            this.$store.commit(SET_QUANTITY, item)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/variables.styl'

.basket
    width 100%
    color $gray

    &__header
        font-size 1.2em
        padding 10px 0px

    &__item
        font-size 1em

        &__small-text
            font-size 0.8em
            color $light-gray

        &__remove-btn
            font-family 'Libre Franklin BoldItalic'
            cursor pointer
            color $tomato
            &:hover
                text-decoration underline

    &__sum
        margin-top 10px
        text-align right 

th, td
    width 25%
    padding 10px
    text-align right 
    text-overflow ellipsis
    overflow hidden
    &:first-child
        text-align left 
</style>

