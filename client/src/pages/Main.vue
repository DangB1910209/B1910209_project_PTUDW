<script >
import Search from '../components/Search.vue'
import FilterStatus from '../components/FilterStatus.vue'
import FilterPriority from '../components/FilterPriority.vue'
import ListTodo from '../components/ListTodo.vue'
import Footer from '../components/Footer.vue'
import DetailTodo from '../components/DetailTodo.vue'
import { axiosClient } from '../services/axiosClient'
import router from '../router'

export default {
    components: {
        Search, FilterStatus, FilterPriority, ListTodo, Footer, DetailTodo
    },
    mounted() {
        this.$store.dispatch('fetchTodos')
    },
    methods: {
        logout() {
            localStorage.clear();
            router.push('/login')
        }
    },
    data() {
        return {
            email: localStorage.getItem('email')
        }
    }
}

</script>

<template>
    <div class="app">
        <div class="main">
            <h1 class="title">TODO APP</h1>
            <Search />
            <FilterStatus />
            <FilterPriority />
            <ListTodo />
            <Footer />

        </div>
        <DetailTodo />
    </div>
    <div class="auth">
        <div class="email">{{ email }}</div>
        <button @click="logout">Logout</button>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 90vh;
    padding: 16px;
    background-color: white;
    box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.1);
}

.app {
    display: flex;
}

.title {
    font-size: 28px;
    text-align: center;
    margin: 10px 0 0px;
}

.auth {
    position: fixed;
    left: 10px;
    top: 2.5vh;
    padding: 10px 20px;
    box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.1);
}

.email {
    margin-bottom: 20px;
}
</style>
