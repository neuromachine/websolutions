<script setup>
import { useUiStore } from '@/stores/uiStore';
const uiStore = useUiStore();
</script>

<template>
    <ul :class="uiStore.isOpen ? 'open' : 'close'" class="navbar-nav">
      <li class="nav-item">
        <RouterLink to="/">Главная</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/services">Услуги</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/portfolio" class="nav-link">Портфолио</RouterLink>
      </li>
<!--      <li class="nav-item">-->
<!--        <RouterLink to="/page/info" class="nav-link">Инфо <i class="fas fa-chevron-down"></i></RouterLink>-->
<!--        <ul class="dropdown-menu">-->
<!--          <li class="nav-item">-->
<!--            <RouterLink to="/compred" class="nav-link">КП</RouterLink>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <RouterLink to="/page/team" class="nav-link">Команда</RouterLink>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <RouterLink to="/price" class="nav-link">Цены</RouterLink>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <RouterLink to="/page/faq" class="nav-link">FAQ</RouterLink>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <RouterLink to="/page/about" class="nav-link">О нас</RouterLink>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </li>-->
      <li class="nav-item">
        <RouterLink to="/page/about" class="nav-link">О нас</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/page/contact" class="nav-link">Контакты</RouterLink>
      </li>
    </ul>
</template>

<style scoped>
@media screen and (max-width: 991px) {
  .close { display: none}
  .open { display: none}
}
</style>