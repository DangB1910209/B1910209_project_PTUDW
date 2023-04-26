
<template>
    <div class="filter">
        <div class="filter-title">Filter By Priority</div>
        <div class="filter-input">
            <v-select class="filter-select" v-model="this.$store.state.filter.priority" multiple
                :options="['Low', 'Medium', 'High']" />

        </div>
    </div>
</template>

<style >
.filter {
    margin: 16px 0;
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

.filter-select>div>.vs__selected-options {
    width: 476px;
    height: 30px;
}
</style>