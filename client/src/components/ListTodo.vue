<script>
import PriorityItem from './PriorityItem.vue';


export default {
    computed: {
        getTodos() {
            return this.$store.getters.todos;
        },
        getSelectTodo() {
            return this.$store.state.selectTodo
        }
    },
    methods: {
        setSelectTodo(todo) {
            const payload = { ...todo };
            const selectTodo = this.$store.state.selectTodo;
            if (selectTodo) {
                if (selectTodo._id !== payload._id) {
                    this.$store.commit("SETSELECTTODO", payload);
                }
                else {
                    this.$store.commit("SETSELECTTODO", undefined);
                }
            }
            else {
                this.$store.commit("SETSELECTTODO", payload);
            }
        },
        toggleCompleteTodo(e, todo) {
            const newTodo = { ...todo, isComplete: e.target.checked }
            this.$store.dispatch('updateTodo', newTodo)
            if (this.getSelectTodo && this.getSelectTodo._id === todo._id) {
                this.$store.commit('SETSELECTTODO', newTodo)
            }
        }
    },
    components: { PriorityItem }
}

</script>

<template>
    <div class="list">
        <div v-if="getTodos.length > 0" v-bind:class="['item', { 'item--active': getSelectTodo?._id === todo._id }]"
            v-for="todo in getTodos">
            <input :checked="todo.isComplete" @input="e => toggleCompleteTodo(e, todo)" type="checkbox">
            <div v-bind:class="['item-main', { 'item-main--complete': todo.isComplete }]" @click="setSelectTodo(todo)">
                <div class="item-left">
                    {{ todo.content }}
                </div>
                <div class="item-right">
                    <PriorityItem :priority="todo.priority" />
                </div>
            </div>
        </div>
        <div v-if="getTodos.length === 0 && this.$store.state.todos.length > 0" class="no-todo">There is no suitable todo
        </div>
        <div v-if="this.$store.state.todos.length === 0" class="no-todo">You don't have any todo yet, click the "add" button
            to create a
            new todo</div>
    </div>
</template>

<style scoped>
.list {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
    margin-top: 4px;
}

.item {
    display: flex;
    padding: 8px 10px;
    align-items: center;
    cursor: pointer;
}

.item--active {
    background-color: #f2f2f2;
}

.item-main {
    flex: 1;
    display: flex;
    justify-content: space-between;
}

.item-main--complete {
    opacity: 0.5;
}

.item-main--complete>.item-left {
    text-decoration: line-through;
}

.item:hover {
    background-color: #f2f2f2;
}

.item-left {
    display: flex;
    align-items: center;
}

.item>input {
    width: 16px;
    height: 16px;
    margin-right: 8px;
}

.no-todo {
    font-size: 14px;
    opacity: 0.5;
}
</style>