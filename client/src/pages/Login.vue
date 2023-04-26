<script>
import router from '../router'
import { axiosClient } from '../services/axiosClient'
export default {
    methods: {
        async login() {
            const res = await axiosClient.post('/auth/login', {
                email: this.email, password: this.password
            })
            const data = res.data
            localStorage.setItem('access_token', data.accessToken)
            localStorage.setItem('email', data.email)
            router.push('/')
        }
    },
    data() {
        return {
            email: '',
            password: ''
        }
    }
}
</script>

<template>
    <div class="login">
        <h1>Login</h1>
        <input class="input" placeholder="Email" v-model="email" type="text">
        <input class="input" placeholder="Password" v-model="password" type="password">
        <button class="button button--auth" @click="login">Login</button><router-link to="/register">Register</router-link>
    </div>
</template>

<style>
.login {
    display: flex;
    flex-direction: column;
    width: 320px;
    padding: 10px 30px 80px;
}

.input {
    padding: 8px 20px 10px 8px;
    border: none;
    background: #f2f2f2;
    margin: 10px 0;
}

.button--auth {
    padding: 10px 0;
    margin: 30px 0;
}
</style>