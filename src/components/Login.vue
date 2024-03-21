<template>
    <h1>LogIn</h1>
    <p v-if="this.responseMsg">{{ responseMsg }}</p>
    <p v-if="this.token">{{ token }}</p>
</template>

<script>
import { userStore } from '../../stores/userStore'

export default {
    data() {
        return {
            userStore: userStore(),
            // Hardcoded - NOT A REAL ACCOUNT
            userEmail: "admin@admin.com",
            userPassword: "Admin1234",
            // Errase later
            responseMsg: "",
            token: ""
        }
    },
    mounted() {
        this.logIn();
        // this.logOut();
    },
    methods: {
        async logIn() {
            let response = await this.userStore.logIn(this.userEmail, this.userPassword);
            this.responseMsg = response;
            this.token = this.userStore.getToken;
        },
        async logOut() {
            let response = await this.userStore.logOut();
            this.responseMsg = response;
        }
    }
}
</script>