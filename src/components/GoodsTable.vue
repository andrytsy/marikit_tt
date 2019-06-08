<template>
    <table class="goods-table">
        <thead class="goods-table__header" v-on:click="isOpen = !isOpen">
            <tr>
                <th colspan="2">
                    {{ data.name }}
                    <svg v-bind:class="{ 'goods-table__header-icon': isOpen, 'goods-table__header-icon_expand': !isOpen }"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 192 192" style=" fill:#000000;">
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                            <path d="M0,192v-192h192v192z" fill="none"></path>
                            <g fill="#767676">
                                <path d="M159.9375,57.5125c-1.68813,0.03991 -3.2921,0.7453 -4.4625,1.9625l-59.475,59.475l-59.475,-59.475c-1.20493,-1.23861 -2.85949,-1.9374 -4.5875,-1.9375c-2.60431,0.00068 -4.94854,1.57924 -5.92852,3.99213c-0.97998,2.41289 -0.40029,5.17897 1.46602,6.99537l64,64c2.49939,2.49836 6.55061,2.49836 9.05,0l64,-64c1.90235,-1.82931 2.48686,-4.6387 1.47198,-7.07495c-1.01487,-2.43625 -3.42103,-3.99981 -6.05948,-3.93755z"></path>
                            </g>
                        </g>
                    </svg>
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
export default {
    name: 'GoodsTable',
    props: [ 'data', 'goods' ],
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        getHeight() {
            if (this.isOpen)
                return (this.goods.length * 50) + 'px' 
            return '0px'
        },
        addToBasket(good) {
            this.$store.commit('addToBasket', good)
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
        text-align left
        display inline-block
        font-size 1.2em
        width 100%
        color $gray
    
    &__header-icon
        padding 10px
        vertical-align middle

        &_expand
            padding 10px
            vertical-align middle
            transform rotateX(180deg)

    &__content
        height 0px
        display block
        overflow hidden
        transition 1s

    &__content-text
        display inline-block
        padding-left 10px
        width 30px

    & tr
        display flex
        flex-direction row
        white-space nowrap
        cursor pointer
        border-bottom 1px solid $light-gray
        &:hover
            background-color $light-blue
        &:active
            background-color $tomato

    & th, td
        overflow hidden
        text-overflow ellipsis
        width 33%
        padding 10px
        cursor pointer
        text-align right 
        &:first-child
            text-align left 
</style>
