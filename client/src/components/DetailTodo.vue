<script>
import formatDate from '../utils/formatDate'
export default {
    methods: {
        cancelDetail() {
            this.$store.commit('SETSELECTTODO', undefined)
        },
        deleteTodo() {
            const { _id, content } = this.$store.state.selectTodo
            this.$store.dispatch('deleteTodo', {
                _id,
                content
            })
        },
        updateTodo() {

            this.$store.dispatch('updateTodo', this.todo)
            this.$store.commit("SETSELECTTODO", { ...this.todo, updatedAt: Date.now() });
            console.log(this.getSelectTodo)
        }
    },
    computed: {
        todo() {
            return this.$store.state.selectTodo
        },
        getSelectTodo() {
            if (this.todo) {
                const todo = { ...this.todo }
                todo.createdAt = formatDate(todo.createdAt)
                todo.updatedAt = formatDate(todo.updatedAt)
                return todo
            }
            return undefined
        },
        content: {
            get() {
                return this.getSelectTodo.content
            },
            set(value) {
                this.$store.commit('SETSELECTTODO', {
                    ...this.todo, content: value
                })
            }
        },
        priority: {
            get() {
                return this.getSelectTodo.priority
            },
            set(value) {
                this.$store.commit('SETSELECTTODO', {
                    ...this.todo, priority: value
                })
            }
        },
        isComplete: {
            get() {
                return this.getSelectTodo.isComplete
            },
            set(value) {
                this.$store.commit('SETSELECTTODO', {
                    ...this.todo, isComplete: value
                })
            }
        }
    }
}
</script>

<template>
    <div v-if="getSelectTodo" class="detail">
        <div class="title">
            <font-awesome-icon @click="cancelDetail" class="cancel" :icon="['fas', 'xmark']" />
            <span>Todo Detail</span>

        </div>
        <div class="content">
            <div class="item">
                <label class="item-title" for="content">Content</label>
                <div class="item-content">
                    <input v-model="content" id="content" type="text">
                </div>
            </div>
            <div class="item">
                <label class="item-title" for="complete">Complete</label>
                <div class="item-content">
                    <input v-model="isComplete" id="complete" type="checkbox">
                </div>
            </div>
            <div class="item">
                <div class="item-title">Priority</div>
                <div class="item-content"><v-select v-model="priority" :options="['Low', 'Medium', 'High']"></v-select>
                </div>
            </div>
            <div class="item">
                <div class="item-title">Created </div>
                <div class="item-content">{{ getSelectTodo.createdAt }}
                </div>
            </div>
            <div class="item">
                <div class="item-title">Updated </div>
                <div class="item-content">{{ getSelectTodo.updatedAt }}
                </div>
            </div>
            <div class="action">
                <span @click="deleteTodo" class="btn btn--delete">Xóa</span>
                <span @click="updateTodo" class="btn btn--update">Cập nhật</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cancel {
    cursor: pointer;
}

.detail {
    width: 500px;
    height: max-content;
    box-shadow: 0 3px 24px 0 rgba(0, 0, 0, .12);
    margin-left: 16px;
    padding: 8px 16px;
}

.title {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}


.title>svg {
    font-size: 20px;
    margin-right: 24px;
}

.title>span {
    font-size: 20px;
}

.item {
    display: flex;
    align-items: center;
    padding: 8px 0;
    margin: 8px 0;
}

.item-title {
    flex: 1;
}

.item-content {
    flex: 3;
}

#content {
    height: 28px;
    width: 100%;
}

#complete {
    width: 16px;
    height: 16px;
}

.action {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.btn {
    color: #fff;
    font-size: 14px;
    padding: 8px 14px;
    border-radius: 3px;
    cursor: pointer;
}

.btn:hover {
    opacity: 0.9;
}

.btn--update {
    background-color: #198754;
}

.btn--delete {
    background-color: #DC3545;
}
</style>