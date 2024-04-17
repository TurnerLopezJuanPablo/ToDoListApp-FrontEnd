<template>
  <main
    :class="{ 'container-fluid vh-100 main bg-dark': store.session, 'container-fluid vh-100 main bg-white': !store.session }">
    <div class="row h-100">
      <div id="asideDiv" :class="{ 'd-none': !store.session }"
        class="col-md-4 col-lg-3 col-xxl-2 d-flex flex-column aside scrollbox">
        <Aside />
      </div>
      <div id="routerViewDiv"
        :class="{ 'col-md-12 d-flex flex-column': !store.session, 'col-md-8 col-lg-9 col-xxl-10 d-flex flex-column scrollbox': store.session }">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script setup>
import { userStore } from "../stores/userStore";
import { onMounted, watch, ref } from "vue";

import Aside from "@/components/views/Aside.vue";

const store = userStore();
const asideDiv = ref(null);
const routerViewDiv = ref(null);

onMounted(async () => {
  try {
    const result = await store.reloadSession();
    console.log('Session reloaded: ', result);
    store.session = result;
  } catch (error) {
    console.error("Error reloading session: ", error);
    store.session = false;
  }
});

watch(() => store.session, (newValue) => {
  asideDiv.value = document.getElementById('asideDiv');
  routerViewDiv.value = document.getElementById('routerViewDiv');

  if (asideDiv.value && routerViewDiv.value) {
    if (!store.session) {
      asideDiv.value.classList.add('d-none');
      routerViewDiv.value.classList.remove('col-md-10', 'bg-dark');
      routerViewDiv.value.classList.add('col-md-12', 'bg-dark');
    } else {
      asideDiv.value.classList.remove('d-none');
      routerViewDiv.value.classList.remove('col-md-12', 'bg-dark');
      routerViewDiv.value.classList.add('col-md-10', 'bg-dark');
    }
  }
},
  { immediate: true }
);

</script>

<style scoped>
.main {
  font-family: "Alatsi", sans-serif;
  font-style: normal;

}

.aside {
  color: #ffffff;
  background-color: #1d1d1d;
}

.scrollbox {
  height: 100%;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #414141;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  cursor: n-resize
}
</style>
