<template>
    <div>
        <section v-for="category in categories" v-bind:key="category.id">
            <GoodsTable :data="category" :goods="getGoods(category.id)" />
        </section>
    </div>
</template>

<script>
import GoodsTable from './GoodsTable'

export default {
    name: 'Catalog',
    components: {
        GoodsTable
    },
    computed: {
        categories() {
            return this.$store.state.categories
        },
        basket() {
            return this.$store.state.basket
        },
        getGoods() {
            return this.$store.getters.getGoodsByGroupId
        }
    },
    created() {
        this.$store.dispatch('fetchData')

        this.interval = setInterval(() => {
            this.$store.dispatch('fetchData')
        }, 15000)
    },
    destroyed() {
        clearInterval(this.interval)
    }
}
</script>
