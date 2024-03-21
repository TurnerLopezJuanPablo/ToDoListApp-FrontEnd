import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Styles
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/js/bootstrap'
import './assets/style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')