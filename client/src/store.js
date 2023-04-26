import { createStore } from 'vuex'
import { axiosClientSecret } from './services/axiosClient';
import { useToast } from 'vue-toast-notification';

const store = createStore({
    state() {
        return {
            todos: [],
            selectTodo: undefined,
            filter: {
                search: '',
                status: '',
                priority: []
            }
        }
    },
    getters: {
        todos(state) {
            return state.todos
                .filter(todo => todo.content.toLowerCase().includes(state.filter.search))
                .filter(todo => {
                    const status = state.filter.status
                    if (!status) return todo
                    if (status === 'complete') return todo.isComplete
                    if (status === 'todo') return !todo.isComplete
                })
                .filter(todo => {
                    const priority = state.filter.priority
                    if (priority.length === 0) {
                        return todo
                    } else {
                        return priority.includes(todo.priority)
                    }
                })
        }
    },
    actions: {
        async fetchTodos(context) {
            try {
                const todos = await axiosClientSecret.get('/todo');
                context.commit("SETTODOS", todos);

            } catch (error) {
                console.log({ error })
                console.log('error')
            }
        },
        async addTodo(context, data) {
            try {
                const newTodo = await axiosClientSecret.post('/todo', data);
                context.commit("ADDTODO", newTodo);
            } catch (error) {
                console.log('error')
            }

        },
        async deleteTodo(context, data) {
            try {
                const { _id, content } = data
                await axiosClientSecret.delete(`/todo/${_id}`);
                context.commit("DELETETODO", _id);
                context.commit("SETSELECTTODO", undefined);
                const $toast = useToast();
                $toast.success(`Delete todo "${content}" successfully`);
            } catch (error) {
                console.log('error')
            }

        },
        async updateTodo(context, data) {
            try {
                const todo = await axiosClientSecret.put(`/todo/${data._id}`, data);
                context.commit("UPDATETODO", todo);
                const $toast = useToast();

                $toast.success(`Update todo "${todo.content}" successfully`);
            } catch (error) {
                console.log('error')
            }

        }
    },

    mutations: {
        SETTODOS(state, payload) {
            state.todos = payload;
        },
        ADDTODO(state, payload) {
            state.todos.unshift(payload)
        },
        DELETETODO(state, payload) {
            const curTodos = [...state.todos].filter(todo => todo._id !== payload);

            state.todos = curTodos
        },
        UPDATETODO(state, payload) {
            const index = state.todos.findIndex(todo => todo._id === payload._id)
            state.todos[index] = payload
        },
        SETSELECTTODO(state, payload) {
            state.selectTodo = payload;
        },
        SETFILTER(state, payload) {
            const curFilter = { ...state.filter, ...payload }
            state.filter = curFilter;
        },
    }
})

export default store