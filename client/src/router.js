import { createRouter, createWebHashHistory } from 'vue-router'
import Main from './pages/Main.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

const routes = [
    {
        path: '/login', component: Login, meta: {
            requiresAuth: false,
        },
    }, {
        path: '/register', component: Register, meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/', component: Main, meta: {
            requiresAuth: true,
        },
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

// GOOD
router.beforeEach((to, from, next) => {
    const access_token = localStorage.getItem('access_token')
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (access_token) {
            next();
        } else {
            next("/login");
        }
    } else {
        next();
    }
})


export default router