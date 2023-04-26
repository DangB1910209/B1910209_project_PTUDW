<script>
import { createPopper } from '@popperjs/core'
export default {
    data() {
        return {
            priority: '',
            content: ''
        }
    }, methods: {
        addTodo() {
            const priority = this.priority
            const content = this.content
            if (priority && content) {
                this.$store.dispatch('addTodo', {
                    priority, content
                })
                this.content = '';
                this.priority = '';
            }
        },
        withPopper(dropdownList, component, { width }) {
            dropdownList.style.width = width
            const popper = createPopper(component.$refs.toggle, dropdownList, {
                placement: 'top',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, -1],
                        },
                    },
                    {
                        name: 'toggleClass',
                        enabled: true,
                        phase: 'write',
                        fn({ state }) {
                            component.$el.classList.toggle(
                                'drop-up',
                                state.placement === 'top'
                            )
                        },
                    },
                ],
            })
            return () => popper.destroy()
        },
    },

}
</script>

<template>
    <div class="footer">
        <input v-model="content" type="text">
        <v-select v-model="priority" class="footer-select" :options="['Low', 'Medium', 'High']" append-to-body
            :calculate-position="withPopper" />
        <button class="button" @click="addTodo">Add</button>
        <div>{{ this.$store.state.count }}</div>
    </div>
</template>

<style>
.footer {
    display: flex;
    gap: 8px;
}

.footer>input {
    flex: 2;
}

.footer-select {
    flex: 1;
}

.footer-select .vs__dropdown-toggle {
    border-radius: none;
}

.v-select.drop-up.vs--open .vs__dropdown-toggle {
    border-radius: 0 0 4px 4px;
    border-top-color: transparent;
    border-bottom-color: rgba(60, 60, 60, 0.26);
}

[data-popper-placement='top'] {
    border-radius: 4px 4px 0 0;
    border-top-style: solid;
    border-bottom-style: none;
    box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
}

.button {
    background-color: #198754;
    border: none;
    outline: none;
    border-radius: 3px;

    padding: 0 10px;
    cursor: pointer;
    color: #fff;
}
</style>