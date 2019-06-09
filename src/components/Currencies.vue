<template>
    <div>
        <span v-if="currency === 'rub'">
            Текущий курс рубля: <span v-bind:class="getRateClass()">{{ currencyRate }}</span>
            <span class="rofl">
                {{ getROFL() }}
                <img v-if="currencyRate > 70" src="../assets/icons/big-brother.jpg" width="200" />
            </span>
        </span>
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
    computed: mapGetters([ 'currency', 'currencyRate', 'oldRate' ]),
    methods: {
        changeCurrency(event) {
            let value = event.target.value
            this.$store.commit(CHANGE_CURRENCY, value)
        },
        getRateClass() {
            if (this.currencyRate < this.oldRate)
                return 'green'
            if (this.currencyRate > this.oldRate)
                return 'red'
            return ''
        },
        // Дорогой читатель! Искрене надеюсь, что этот небольшой каламбур не вызовет у тебя негативной реакции, 
        // а наоборот заставит улыбнуться и вспомнить замечательные 2000 годы когда курс доллара был 28 рублей :)  
        getROFL() {
            if (this.currencyRate > 70)
                return 'Это всё проделки госдепа!'
            else if (this.currencyRate < 30)
                return 'Зашибись, нефть по 200$!'
            return ''
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

.rofl
    margin-right 50px
    color $gray
    font-family 'Libre Franklin ThinItalic'
    font-size 0.8em
    position relative

    & img 
        position absolute
        left -20px
        top 20px

.red
    color $tomato

.green
    color $seagreen

</style>
