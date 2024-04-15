<template>
    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-around">
            
            <div class="w-50 me-2" style="max-width: 500px;">
                <form @submit.prevent="submitForm">
                    <h1 class="text-center my-4">Welcome!</h1>
                    <p class="text-center">Please enter your Email and Password</p>

                    <div class="alert alert-danger mx-3 mb-4" v-if="this.errorMsg !== ''">
                        <strong>Error!</strong> {{ errorMsg }}
                    </div>

                    <div
                        :class="{ 'form-floating': true, 'mb-2': this.errorEmailMsg !== '', 'mb-4': this.errorEmailMsg === '', 'mx-3': true, 'mt-4': true }">
                        <input type="email" class="form-control" id="email" placeholder="email" name="email"
                            v-model="this.userEmail">
                        <label for="email">Email</label>
                    </div>

                    <div class="alert alert-danger mx-3 mb-4" v-if="this.errorEmailMsg !== ''">
                        <strong>Error!</strong> {{ errorEmailMsg }}
                    </div>

                    <div
                        :class="{ 'row': true, 'mb-2': this.errorPasswordMsg !== '', 'mb-4': this.errorPasswordMsg === '', 'mx-1': true, 'mt-4': true }">
                        <div class="col-10">
                            <div class="input-group">
                                <div class="form-floating">
                                    <input :type="this.showPassword ? 'text' : 'password'" class="form-control"
                                        id="password" placeholder="password" name="password"
                                        v-model="this.userPassword">
                                    <label for="password">Password</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            <button class="btn" @click.prevent="toggleShowPassword()">
                                <img v-if="this.showPassword" src="../assets/icons/icons8-eye-32.png" alt="eyePng">
                                <img v-else src="../assets/icons/icons8-closed-eye-32.png" alt="eyePng">
                            </button>
                        </div>
                    </div>

                    <div class="alert alert-danger mx-3 mb-4" v-if="this.errorPasswordMsg !== ''">
                        <strong>Error!</strong> {{ errorPasswordMsg }}
                    </div>

                    <div class="d-flex justify-content-center px-5 mb-2 mt-4">
                        <button v-if="!this.loading" type="submit"
                            class="btn light-blue-bg white px-5 py-2 text-normal">LogIn
                        </button>
                        <button v-else class="btn btn-primary px-4 py-2 text-normal" disabled>
                            <span class="spinner-border spinner-border-sm"> </span>
                            Loading...
                        </button>
                    </div>
                </form>
                <p class="text-center mt-3">Forgot your password? <a class="link-opacity-75-hover" href="#">Click
                        here</a></p>
                <div class="d-flex justify-content-around align-items-center">
                    <p class="my-3 me-3">Don't have an account?</p>
                    <button type="submit" class="btn blue-bg white px-5 py-2 text-normal">SignUp</button>
                </div>
            </div>

            <img src="../assets/img-logIn.png" alt="image-logIn" class="mr-3 d-none d-md-inline w-50 me-0" style="max-width: 500px;">
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { userStore } from '../../stores/userStore'

export default {
    data() {
        return {
            userStore: userStore(),
            router: useRouter(),
            userEmail: "",
            userPassword: "",
            errorEmailMsg: "",
            errorPasswordMsg: "",
            errorMsg: "",
            showPassword: false,
            loading: false,
        }
    },
    watch: {
        'userStore.isLogged': function (newValue) {
            if (newValue) {
                this.$router.push({ name: 'home' });
            }
        }
    },
    methods: {
        async submitForm(event) {
            event.preventDefault();
            this.loading = true;
            this.resetErrors();

            try {
                let errorInput = false;

                if (!this.userEmail || this.userEmail === '') {
                    this.errorEmailMsg = "Insert your Email to LogIn."
                    errorInput = true
                }

                if (!this.userPassword || this.userPassword === '') {
                    this.errorPasswordMsg = "Insert your Password to LogIn."
                    errorInput = true
                }

                if (errorInput) { throw new Error('ErrorInputs'); }

                const response = await this.userStore.logIn(this.userEmail, this.userPassword);

                if (response.success) {
                    alert(response.message);
                    this.userStore.session = true;
                    this.router.push({ name: 'home' });
                } else {
                    this.errorMsg = response.message;
                }

            } catch (error) {
                if (error.message === 'ErrorInputs') {
                    alert('Please fill in all required fields.');
                } else {
                    console.error(error);
                }
            } finally {
                this.loading = false;
            }
        },
        resetErrors() {
            this.errorEmailMsg = "";
            this.errorPasswordMsg = "";
            this.errorMsg = "";
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        }
    },
}
</script>
