<template>
  <div class="layout">
    <header></header>
    <aside></aside>
    <main>
      <RouterView></RouterView>
    </main>
    <aside class="sidebar2"></aside>
    <Footer class="footer"></Footer>
  </div>
</template>

<script setup>
import { userStore } from '../stores/userStore';
import { onMounted } from 'vue';

import Footer from '@/components/views/Footer.vue'

const store = userStore();

onMounted(async () => {
  try {
    const result = await store.reloadSession();
    console.log('Session reloaded: ', result);
    store.session = true;
  } catch (error) {
    console.error('Error reloading session: ', error);
    store.session = false;
  }
});
</script>

<style scoped>
.layout {

  /* display: grid;
  grid-template-rows: 80px auto 0 80px;
  grid-template-columns: 1fr;
  grid-template-areas: 'header' 'sidebar' 'main' 'footer';
  */

  height: 100vh;

  font-family: "Alatsi", sans-serif;
  font-style: normal;
}

@media (min-width: 768px) {
  .layout {
    display: grid;
    grid-template-rows: 80px auto 80px;
    grid-template-columns: 180px auto 180px;
    grid-template-areas:
      'header header header'
      'sidebar main sidebar2'
      'footer footer footer';
  }
}

@media (max-width: 768px) {
  .sidebar2 {
    display: none;
  }
}

header {
  grid-area: header;
  background: #59546c;
}

.footer {
  grid-area: footer;
  background: #0e121f;
  color: #f3f9d2;
  margin: 0;
}

aside {
  grid-area: sidebar;
  /* background: #f6c356; */
}

.sidebar2 {
  grid-area: sidebar2;
  /* background: #f6c356; */
}

main {
  grid-area: main;
}
</style>