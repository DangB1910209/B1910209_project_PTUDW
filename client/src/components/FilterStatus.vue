<script>
export default {
    methods: {
        changeInput(e) {
            this.$store.commit('SETFILTER', {
                status: e.target.value
            })
        }
    },
    data() {
        return {
            status: ''
        }
    }
}
</script>

<template>
    <div class="filter">
        <div class="filter-title">Filter By Status</div>
        <div class="filter-input">
            <input type="radio" id="all" value="" @change="changeInput" v-model="status">
            <label for="all">All</label>
            <input type="radio" id="completed" value="complete" @change="changeInput" v-model="status">
            <label for="completed">Completed</label>
            <input type="radio" id="todo" value="todo" @change="changeInput" v-model="status">
            <label for="todo">To do</label>
        </div>
    </div>
</template>

<style scoped>
.filter {
    margin: 16px 0 8px;
}

.filter-title {
    font-weight: 600;
    margin-bottom: 8px;
}

.filter-input {
    display: flex;
    align-items: center;
}

.filter-input>label {
    margin-left: 4px;
    margin-right: 8px;
}
</style>