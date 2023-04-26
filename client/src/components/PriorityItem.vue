<script >
export default {
    props: ['priority'],
    computed: {

        getColor() {
            let color = '';
            if (this.priority === 'High') {
                color = '#Dc3545';
            } else if (this.priority === 'Medium') {
                color = '#0d6efd';
            } else {
                color = '#495057'
            }
            return color
        },
        getBackgroud() {
            let background = '';
            if (this.priority === 'High') {
                background = '#f8d7da';
            } else if (this.priority === 'Medium') {
                background = '#cfe2ff';
            } else {
                background = '#F8F9FA'
            }
            return background
        },

        getBorder() {
            let border = '';
            if (this.priority === 'High') {
                border = '#f1aeb5';
            } else if (this.priority === 'Medium') {
                border = '#9EC5FE';
            } else {
                border = '#E9ECEF'
            }
            return border
        }

    }
}
</script>

<template>
    <div class="priority">{{ priority }}</div>
</template>


<style>
.priority {
    color: v-bind(getColor);
    background: v-bind(getBackgroud);
    border: v-bind(getBorder) 1px solid;
    font-size: 14px;
    height: 22px;
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>