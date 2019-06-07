<template>
    <div>
        Marikit Holdings LTD
        {{ categories.length }}
        <section v-for="category in categories" v-bind:key="category.id">
            {{ category }}
            <GoodsTable :data="category" />
        </section>
        <DropDown />
    </div>
</template>

<script>
import GoodsTable from './GoodsTable'
import DropDown from './Dropdown'
import { mapState } from 'vuex'

export default {
    name: 'Catalog',
    components: {
        GoodsTable,
        DropDown
    },
    computed: mapState([ 'categories' ]),
    mounted() {
        this.$store.dispatch('fetchData');
    }
}
</script>
