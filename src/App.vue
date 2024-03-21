<template>
  <div class="layout">
    <!-- <header>Header</header>
    <aside>Tasks/GroupsList</aside> -->
    <main>
      <RouterView></RouterView>
    </main>
    <!-- <aside class="sidebar2">TaskConfigurations</aside>
    <footer class="footer">Footer</footer> -->
  </div>
</template>

<style scoped>
/* .layout {
  display: grid;
  grid-template-rows: 80px auto 0 80px;
  grid-template-columns: 1fr;
  grid-template-areas: 'header' 'sidebar' 'main' 'footer';
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
  background: #c08bfd;
}

.footer {
  grid-area: footer;
  background: #2f2f2f;
  color: #f3f9d2;
  margin: 0;
}

aside {
  grid-area: sidebar;
  background: #f6c356;
}

.sidebar2 {
  grid-area: sidebar2;
  background: #f6c356;
}

main {
  grid-area: main;
  background: #b2ee94;
} */
</style>