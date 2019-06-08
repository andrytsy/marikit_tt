<template>
    <nav>
        <ul class="menu">
            <li class="menu__link">
                <a href="#/">Каталог</a>
            </li>
            <li class="menu__link">
                <a href="#/basket">Корзина</a>
            </li>
            <li class="menu__basket-message">
                <span v-if="getGoodsInBasketQuantity">
                    В корзине: {{ getGoodsInBasketQuantity }} 
                </span>
                <span v-else>
                    В вашей корзине пока ничего нет
                </span>
            </li>
            <li class="menu__currencies">
                <Currencies />
            </li>
        </ul>
    </nav>
</template>

<script>
import Currencies from './Currencies.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Menu',
    components: { Currencies },
    computed: mapGetters([ 'getGoodsInBasketQuantity' ])
}
</script>

<style lang="stylus">
@import '../assets/styles/variables.styl'

.menu 
    text-align left
    font-family 'Libre Franklin BoldItalic'
    padding 10px

    &__link
        display inline-block

        & a
            padding 10px
            margin-right 5px
            color $royalblue
            border 1px solid $royalblue
            border-radius 10px
            text-decoration none

            &:hover
                background-color $royalblue
                color $white

    &__basket-message
        color $gray
        display inline-block

    &__currencies
        display inline-block
        float right
</style>
