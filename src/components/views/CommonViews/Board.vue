<template>
    <div class="container my-3">
        <h1 class="text-center">{{ title }}</h1>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { userStore } from '../../../../stores/userStore';

export default {
    data() {
        return {
            router: useRouter(),
            route: useRoute(),
            boardId: 0,

            userStore: userStore(),
            title: 'Board name'
        }
    },
    mounted() {
        this.setData();
    },
    updated() {
        this.setData();
    },
    methods: {
        setData() {
            if (!this.userStore.currentUserData) {
                this.router.push({ name: 'tasksForToday' });
            } else {
                this.boardId = this.route.params.id;
                this.title = this.userStore.currentUserData[this.boardId-1].Board.title;
            }
        }
    }
}

</script>

<style scoped>
* {
    color: #ffffff;
}
</style>