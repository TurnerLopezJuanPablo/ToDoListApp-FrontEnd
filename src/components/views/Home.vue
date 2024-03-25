<template>
    <h1 class="text-center mt-3 mb-5">Welcome to TaskMaster!</h1>
    <div class="d-flex justify-content-center align-items-center">
        <button v-if="!this.loading" type="submit" class="btn btn-danger px-5 py-2 text-normal" @click="this.logOut()">
            LogOut
        </button>
        <button v-else class="btn btn-danger px-4 py-2 text-normal" disabled>
            <span class="spinner-border spinner-border-sm"> </span>
            Loading...
        </button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { userStore } from '../../../stores/userStore'

export default {
    data() {
        return {
            userStore: userStore(),
            router: useRouter(),
            loading: false
        }
    },
    watch: {
        '!userStore.isLogged': function (newValue) {
            if (newValue) {
                this.$router.push({ name: 'home' });
            }
        }
    },
    methods: {
        logOut() {
            this.loading = true;
            this.userStore.logOut().then(() => {
                this.loading = false;
            })
        }
    },
}
</script>
