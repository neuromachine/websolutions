<script setup>
import { RouterLink } from 'vue-router'
import {onMounted, onUnmounted, ref} from "vue";

// Правильное объявление пропсов
const props = defineProps({
  structure: {
    type: Array,
    required: true
  }
})

const isMobile = ref(window.innerWidth <= 991);
const menuOpen = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 991;
  if (!isMobile.value) {
    menuOpen.value = false;
  }
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};



onMounted(() => {
  window.addEventListener('resize', checkScreen);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen);
});
</script>

<template>
  <nav :class="{ 'is-mobile': isMobile }">
    <button @click="toggleMenu" v-if="isMobile">Меню</button>
    <ul v-show="!isMobile || menuOpen">
      <li v-for="(item, index) in structure" :key="index">
        <RouterLink :to="item.link">{{ item.title }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>



<style scoped>
nav {
  /* Стили для десктопного меню */
}
nav.is-mobile {
  /* Стили для мобильного меню */
}
button {
  /* Стили для кнопки "Меню" */
}
ul {
  /* Стили для списка пунктов меню */
}
.responsive-menu {
  background: white;
  padding: 1rem;
}

/* Прячем на десктопах */
@media screen and (min-width: 992px) {
  .responsive-menu {
    display: none;
  }
}

.responsive-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsive-menu li {
  margin-bottom: 0.75rem;
}
</style>
