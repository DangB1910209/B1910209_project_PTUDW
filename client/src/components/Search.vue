<script>
export default {
    methods: {
        changeInput(e) {
            this.$store.commit('SETFILTER', {
                search: e.target.value.toLowerCase()
            })
        }
    }
}
</script>

<template>
    <div class="search">
        <label for="search-input">Search</label>
        <input @input="changeInput" id="search-input" type="text" placeholder="Input search text">
    </div>
</template>

<style scoped >
.search {
    padding: 8px 0;
}

.search>label {
    display: block;
    font-weight: 600;
}

.search>input {
    display: flex;
    width: 100%;
    padding: 10px 0px;
    text-indent: 10px;
    margin-top: 8px;
    border-radius: 3px;
    border: 1px solid rgb(210, 210, 210);
    transition: 0.2s all ease-in-out;
}

.search>input:focus {
    border: 1px solid rgb(76, 122, 207);
}
</style>