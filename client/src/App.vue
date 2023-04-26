<script >

export default {
    name: 'App',

}

</script>

<template>
    <div class="wrapper">
        <router-view />

    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

}

.app {
    display: flex;
}
</style>
