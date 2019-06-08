<template>
    <div>
        <a href="#/basket">В КОРЗИНУ</a>
        <section v-for="category in categories" v-bind:key="category.id">
            <GoodsTable :data="category" :goods="getGoods(category.id)" />
        </section>
    </div>
</template>

<script>
import GoodsTable from './GoodsTable'
import { mapState } from 'vuex'

export default {
    name: 'Catalog',
    components: {
        GoodsTable
    },
    computed: mapState([ 'categories' ]),
    methods: {
        getGoods(id) {
            return this.$store.getters.getGoodsByGroupId(id)
        }
    },
    created() {
        this.$store.dispatch('fetchData')
    }
}
</script>
