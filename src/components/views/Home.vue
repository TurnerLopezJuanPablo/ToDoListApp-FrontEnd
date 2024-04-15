<template>
    <div class="container my-5">
        <div class="container-fluid">
            <div class="row">
                <div v-for="a in as" class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3" style="height: 40vh;">
                    <div class="card bg-dark h-100">
                        <div class="card-header text-center">TaskTitle</div>
                        <div class="card-body">
                            <p>Description</p>
                        </div>
                        <div class="card-footer">Priority, Category</div>
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
                this.$router.push({ name: 'home' });
            }
        }
    }
}
</script>

<style scoped>
h1 {
    color: #fff;
}

.card-header,
.card-footer {
    background-color: #474747;
    color: #fff;
}

.card-body {
    background-color: #585858;
    color: #fff;
}
</style>
