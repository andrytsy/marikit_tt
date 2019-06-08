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
                <span v-if="basket.length">
                    В корзине: {{ basket.length }} 
                </span>
                <span v-else>
                    В вашей корзине пока ничего нет
                </span>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    computed: mapState([ 'basket' ])
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
</style>
