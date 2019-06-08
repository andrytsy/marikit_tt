<template>
    <div id="app">
        <Menu />
        <router-view></router-view>
    </div>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
    name: 'App',
    components: {
        Menu
    }
}
</script>

<style lang="stylus">
@import './assets/styles/fonts.styl'

body 
    margin 0
    padding 0
    font-family 'Libre Franklin Regular', 'Arial', 'sans-serif'
    font-size 100%
</style>
