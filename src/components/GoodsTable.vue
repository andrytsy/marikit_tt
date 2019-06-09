<template>
    <table class="goods-table">
        <thead class="goods-table__header" v-on:click="toggleContent()">
            <tr>
                <th colspan="2">
                    {{ group.name }}
                    <ArrowIcon 
                        v-bind:class="{ 
                            'goods-table__header-icon': isOpen, 
                            'goods-table__header-icon_expand': !isOpen 
                        }"
                    />
                </th>
            </tr>
        </thead>
        <tbody class="goods-table__content" v-bind:style="{ 'height': getHeight() }">
            <tr v-for="good in goods" v-bind:key="good.id" v-on:click="addToBasket(good)" >
                <td>
                    {{ good.name }}
                </td>
                <td>
                    Количество:
                    <span class="goods-table__content-text">{{ good.avalible }}</span>
                </td>
                <td>
                    Цена:
                    <span class="goods-table__content-text">{{ good.price }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { ADD_TO_BASKET } from '../store/mutations.type'
import ArrowIcon from '../assets/icons/arrow.svg'

export default {
    name: 'GoodsTable',
    props: [ 'group' ],
    components: { ArrowIcon },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        goods() {
            return this.$store.getters.getGoodsByGroupId(this.group.id)
        }
    },
    methods: {
        toggleContent() {
            this.isOpen = !this.isOpen
        },
        getHeight() {
            if (this.isOpen)
                return (this.goods.length * 50) + 'px' 
            return '0px'
        },
        addToBasket(good) {
            this.$store.commit(ADD_TO_BASKET, good)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/variables.styl'

.goods-table
    width 100%
    border-spacing 0

    &__header
        color $gray
        width 100%
        font-size 1.2em
        text-align left
        display inline-block
        border-bottom 1px solid $light-gray
        cursor pointer
        &:hover
            background-color $light-blue
            color $royalblue
    
    &__header-icon
        padding 10px
        vertical-align middle
        transform rotateX(180deg)

        &_expand
            padding 10px
            vertical-align middle

    &__content
        height 0px
        display block
        overflow hidden
        transition 1s

        & tr
            display flex
            flex-direction row
            white-space nowrap
            border-bottom 1px solid $light-gray
            cursor pointer
            &:hover
                background-color $light-blue
                color $royalblue
            &:active
                background-color $seagreen
                color $white

    &__content-text
        text-align center
        display inline-block
        padding-left 10px
        width 70px

th, td
    width 33%
    padding 10px
    text-align right 
    text-overflow ellipsis
    overflow hidden
    cursor pointer
    &:first-child
        text-align left 
</style>
