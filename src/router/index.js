import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'catalog',
            path: '/',
            component: () => import('../components/Catalog')
        },
        {
            name: 'basket',
            path: '/basket',
            component: () => import('../components/Basket')
        }
    ]
})