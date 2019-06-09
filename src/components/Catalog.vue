<template>
    <div>
        <section v-for="category in categories" v-bind:key="category.id">
            <GoodsTable :group="category" />
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_DATA, FETCH_CURRENCY_RATE } from '../store/actions.type'
import GoodsTable from './GoodsTable'

export default {
    name: 'Catalog',
    components: { GoodsTable },
    computed: mapGetters([ 'categories' ]),
    created() {
        this.$store.dispatch(FETCH_DATA)
        this.$store.dispatch(FETCH_CURRENCY_RATE)

        this.interval = setInterval(() => {
            this.$store.dispatch(FETCH_DATA)
            this.$store.dispatch(FETCH_CURRENCY_RATE)
        }, 15000)
    },
    destroyed() {
        clearInterval(this.interval)
    }
}
</script>
