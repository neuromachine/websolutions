<script setup>
import { useUiStore } from '@/stores/uiStore';
const uiStore = useUiStore();
</script>

<template>
    <ul :class="uiStore.isOpen ? 'open' : 'close'" class="navbar-nav">
      <li class="nav-item">
        <AppLink to="/">Главная</AppLink>
      </li>
      <li class="nav-item">
        <AppLink class="nav-link" to="/services">Услуги</AppLink>
      </li>
      <li class="nav-item">
        <AppLink to="/portfolio" class="nav-link">Портфолио</AppLink>
      </li>
      <li class="nav-item">
        <AppLink to="/pages/price" class="nav-link">Цены</AppLink>
      </li>
      <li class="nav-item">
        <AppLink to="/pages/about" class="nav-link">О нас</AppLink>
      </li>
      <li class="nav-item">
        <AppLink to="/pages/contacts" class="nav-link">Контакты</AppLink>
      </li>
    </ul>
</template>

<style scoped>
@media screen and (max-width: 991px) {
  .close { display: none}
  .open { display: none}
}
</style>