<script>
import router from '../router'
import { axiosClient } from '../services/axiosClient'
import { useToast } from 'vue-toast-notification';
export default {
    methods: {
        async register() {
            const res = await axiosClient.post('/auth/register', {
                email: this.email, password: this.password
            })
            const $toast = useToast();
            $toast.success(`Register successfully`);
            router.push('/login')
        }
    },
    data() {
        return {
            email: '',
            password: '',
            passwordConfirm: ''
        }
    }
}
</script>

<template>
    <div class="login">
        <h1>Register</h1>
        <input placeholder="Email" class="input" v-model="email" type="text">
        <input placeholder="Password" class="input" v-model="password" type="password">
        <input placeholder="Password Confirm" class="input" v-model="passwordConfirm" type="password">
        <button class="button button--auth" @click="register">Register</button>
        <router-link to="/login">Login</router-link>
    </div>
</template>

<style>
.login {
    display: flex;
    flex-direction: column;
    width: 320px;
    padding: 10px 30px 80px;
    box-shadow: 0 3px 24px 0 rgba(0, 0, 0, .12);
}
</style>