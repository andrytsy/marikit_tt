<template>
    <div>
        Валюта: 
        <select class="currencies" name="currencies" v-bind:value="currency" @change="changeCurrency">
            <option class="currencies__item" v-for="currency in currencies" v-bind:value="currency" v-bind:key="currency">
                {{ currency }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CHANGE_CURRENCY } from '../store/mutations.type'


export default {
    name: 'Currencies',
    data() {
        return {
            currencies: ['usd', 'eur', 'rub']
        }
    },
    computed: mapGetters([ 'currency', 'currencyRate' ]),
    methods: {
        changeCurrency(event) {
            let value = event.target.value
            this.$store.commit(CHANGE_CURRENCY, value)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/variables.styl'

.currencies
    padding 10px
    position relative
    top 0
    margin-top -10px
    border 1px solid $royalblue
    text-transform uppercase
    color $royalblue
    cursor pointer
    &:hover
        color $white
        background-color $royalblue

    &__item
        background-color $white
        color $royalblue
</style>
