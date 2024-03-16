<template>
  <div class="layout">
    <header class="alatsi-regular">Header</header>
    <aside class="sidebar" @click="toggleSidebar">Tasks/GroupsList</aside>
    <main>TaskInfo</main>
    <aside class="sidebar2">TaskConfigurations</aside>
    <footer>Footer</footer>
  </div>
</template>

<style scoped>
@import './assets/style.css';
@import url('https://fonts.googleapis.com/css2?family=Alatsi&display=swap');
</style>