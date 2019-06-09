<template>
    <div>
        <section v-for="category in categories" v-bind:key="category.id">
            <GoodsTable :group="category" />
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_DATA } from '../store/actions.type'
import GoodsTable from './GoodsTable'

export default {
    name: 'Catalog',
    components: { GoodsTable },
    computed: mapGetters([ 'categories' ]),
    created() {
        this.$store.dispatch(FETCH_DATA)

        this.interval = setInterval(() => {
            this.$store.dispatch(FETCH_DATA)
        }, 15000)
    },
    destroyed() {
        clearInterval(this.interval)
    }
}
</script>
