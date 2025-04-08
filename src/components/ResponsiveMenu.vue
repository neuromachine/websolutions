<template>
  <nav class="responsive-menu">
    <ul>
      <li v-for="(item, index) in structure" :key="index">
        <RouterLink v-if="item.link" :to="item.link">{{ item.title }}</RouterLink>
        <span v-else>{{ item.title }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
  structure: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
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