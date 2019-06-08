<template>
    <div>
        <a href="#/">В КАТАЛОГ</a>
        <table class="basket">
            <thead>
                <tr class="basket__header">
                    <th>
                        Наименование товара и описание 
                    </th>
                    <th>
                        Количество
                    </th>
                    <th>
                        Цена
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="basket__content-item" v-for="good in basket" v-bind:key="good.id">
                    <td>
                        {{ good.name }}
                    </td>
                    <td>
                        {{ good.quantity }}
                    </td>
                    <td>
                        {{ good.price }}
                    </td>
                </tr>
                <tr class="basket__content-item_right">
                    <td colspan="3">
                        Общая стоимость: {{ getSum() }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Basket',
    computed: mapState([ 'basket' ]),
    methods: {
        getSum() {
            return this.basket.reduce((result, good) => {
                return result += good.price
            }, 0)
        }
    }
}
</script>

<style lang="stylus" scoped>
.basket
    text-align left 
    border-left 1px solid #555
    padding-left 30px

    &__header
        padding 10px 0px
        font-weight 800
        color #555
        font-size 0.9em
    &__content-item
        color #444
        font-size 1em

        &_right
            margin-top 10px
            text-align right 
</style>

