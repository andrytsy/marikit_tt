<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="stylus">
@import './assets/styles/fonts.styl'

#app
    font-family 'Libre Franklin Regular', 'Arial', 'sans-serif'
    font-size 100%
</style>
