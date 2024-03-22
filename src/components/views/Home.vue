<template>
    <h1 class="text-center mt-3 mb-5">Welcome to TaskMaster!</h1>
    <div class="d-flex justify-content-center align-items-center">
        <button type="submit" class="btn btn-danger px-5 py-2 text-normal" @click="this.logOut()">LogOut</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { userStore } from '../../../stores/userStore'
import router from '@/router';

export default {
    data() {
        return {
            userStore: userStore(),
            router: useRouter(),
        }
    },
    mounted() {
        if (!this.userStore.reloadSession()) {
            this.router.push({ name: 'login' });
        }
    },
    methods: {
        logOut() {
            this.userStore.logOut();
        }
    },
}
</script>
