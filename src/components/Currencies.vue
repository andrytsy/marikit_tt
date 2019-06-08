<template>
    <div>
        Валюта: 
        <select name="currencies" v-bind:value="currency" @change="changeCurrency($event)">
            <option v-for="currency in currencies" v-bind:value="currency" v-bind:key="currency">
                {{ currency }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Currencies',
    data() {
        return {
            currencies: ['usd', 'eur', 'rub']
        }
    },
    computed: mapState([ 'currency', 'currencyRate' ]),
    methods: {
        changeCurrency(event) {
            let value = event.target.value
            this.$store.commit('changeCurrency', value)
        }
    }
}
</script>
