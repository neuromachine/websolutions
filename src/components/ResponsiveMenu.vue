<script setup>
import { useNavigationStore } from '@/stores/navigationStore'
import ScopeSwitch from "@/components/ScopeSwitch.vue";
const navStore = useNavigationStore()
</script>

<template>
  <nav class="responsive-menu">
    <ul>
      <li
          v-for="item in navStore.nav"
          :key="item.path">
        <AppLink :to="item.path" class="nav-link">{{ item.anchor }}</AppLink>
      </li>
    </ul>
    <ScopeSwitch />
  </nav>
</template>

<style scoped>
.responsive-menu {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  margin-left: 1rem;
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

.burger-button {
  background: white;
  border: none;
  font-size: 2rem;
  font-weight: 700;
  color: #0a1f44; /* Тёмно-синий */
  cursor: pointer;
  display: none; /* Покажем только в адаптиве */
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease;
}

.burger-button:hover {
  background-color: rgba(10, 31, 68, 0.05);
}

.burger-button .fa-bars {
  transition: transform 0.3s ease;
}

.burger-button.open .fa-bars {
  transform: rotate(90deg);
}

@media screen and (max-width: 991px) {
  .burger-button {
    display: block;
  }
}
</style>
