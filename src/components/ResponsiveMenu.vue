<template>
  <nav :class="{ 'is-mobile': isMobile }">
    <button @click="toggleMenu" v-if="isMobile">Меню</button>
    <ul v-show="!isMobile || menuOpen">
      <li v-for="item in menuItems" :key="item.slug">
        <RouterLink :to="item.slug">{{ item.title }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
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

    return {
      isMobile,
      menuOpen,
      toggleMenu,
      menuItems: [
        { title: 'Главная', slug: '/' },
        { title: 'О нас', slug: '/about' },
        // Добавьте остальные пункты меню
      ],
    };
  },
};
</script>

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

</style>
