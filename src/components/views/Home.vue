<template>
    <div class="container my-3">
            <div class="row">
                <div v-for="a in as" class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3" style="height: 40vh;">
                    <div class="card h-100">
                        <div class="card-header text-center">TaskTitle</div>
                        <div class="card-body">
                            <p>Description</p>
                        </div>
                    </div>
                </div>
        </div>
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
            as: 10
        }
    },
    watch: {
        '!userStore.isLogged': function (newValue) {
            if (newValue) {
                this.$router.push({ name: 'login' });
            }
        }
    }
}
</script>

<style scoped>
h1 {
    color: #fff;
}

.card {
    background-color: #474747;
}

.card-header {
    background-color: #474747;
    color: #fff;
}

.card-body {
    background-color: #585858;
    color: #fff;
}
</style>
