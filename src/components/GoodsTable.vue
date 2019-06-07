<template>
    <table>
        <tbody>
            <tr>
                <th colspan="2">{{ data.name }}</th>
            </tr>
            <tr v-for="good in getGoodsByGroupId(data.id)" v-bind:key="good.id">
                <td> {{ good.name }} </td>
                <td> {{ good.quantity }} </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Table',
    props: [ 'data' ],
    computed: mapGetters([ 'getGoodsByGroupId' ])
}
</script>

<style lang="stylus" scoped>

</style>
