import { defineStore } from 'pinia'
import { instance } from '../utils/authorization'
import apiUrl from '../config/config'
import { setCookie, removeCookie, getCookie } from '../utils/cookies'
import { setAuthorizationHeader } from '../utils/authorization'
import { useRouter } from 'vue-router'

export const userStore = defineStore('user', {
    state: () => ({
        url: `${apiUrl}user`,
        currentUser: null,
        currentUserData: null,
        router: useRouter(),
        session: false
    }),
    actions: {
        async logIn(email: String, password: String) {
            const data = {
                email, password
            }

            try {
                const response = await instance.post(`${this.url}/login`, data, { withCredentials: true });

                setCookie(response.data.user.token);

                if (response.data.success) {
                    this.getAllUserData();
                }

                return response.data;
            } catch (error) {
                return error.response.data
            }
        },

        async logOut() {
            try {
                const response = await instance.post(`${this.url}/logout`, { withCredentials: true });
                alert(response.data.message);

                this.currentUserData = null;

                if (response.data.success) {
                    removeCookie();
                }
            } catch (error) {
                console.log(error)
            }
        },

        async getAllUserData() {
            try {              
                const response = await instance.get(`${this.url}/getAllData`, { withCredentials: true });
                const { Contributes, ...userData } = response.data.result;

                this.currentUserData = Contributes;
                this.currentUser = userData;
               
                return response.data.message;
            } catch (error) {
                this.router.push({ name: 'login' });
                this.session = false;

                throw new Error(error.message);
            }
        },

        async reloadSession() {
            const cookieSession = getCookie();
            
            if (cookieSession === '') {
                this.router.push({ name: 'login' });
                return false;
            }

            try {
                setAuthorizationHeader(cookieSession);
                await this.getAllUserData();
                
                this.router.push({ name: 'tasksForToday' });
                this.session = true;

                return true;
            } catch (error) {
                console.error(`Error reloading session: ${error.message}`);
                
                this.router.push({ name: 'login' });
                this.session = false;

                return false;
            }
        }
    },
    getters: {
        isLogged() {
            return getCookie() !== '' && this.session;
        }
    }
})