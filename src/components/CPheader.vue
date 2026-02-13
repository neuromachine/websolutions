<template>
  <header class="site-header" >
    <div class="container-xxl">
      <nav class="navbar navbar-expand-lg">

        <!-- Logo -->
        <a class="navbar-brand" href="/">
          <div class="logo-wrapper">
            <slot name="logo">
              <WSpro />
            </slot>
          </div>
        </a>

        <!-- Desktop nav (collapse on mobile) -->
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto align-items-center gap-2">
            <li class="nav-item">
              <a class="nav-link" href="#benefits">Услуги</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#pricing">Стоимость</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#about">О студии</a>
            </li>
            <li class="nav-item ms-2">
              <a class="btn btn-primary btn-sm" href="#contact">Обсудить проект</a>
            </li>
          </ul>
        </div>

      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import WSpro from "@/components/WSpro.vue";
// const isScrolled = ref(false)
// let headerHeight = 0
//
// // function onScroll() {
// //   isScrolled.value = window.scrollY > headerHeight
// // }
//
// onMounted(() => {
//   headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0
//   window.addEventListener('scroll', onScroll, { passive: true })
// })
//
// onUnmounted(() => {
//   window.removeEventListener('scroll', onScroll)
// })
</script>

<style scoped>
.site-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1030;
  background: transparent;
  transition: background .25s ease, box-shadow .25s ease;
}

.site-header--scrolled {
  background: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .08);
}

/* Lock container to 1320px on any screen at or above that width */
.container-xxl {
  max-width: 1320px;
}

/* Logo wrapper — always 91×38, never shrinks */
.logo-wrapper {
  width: 91px;
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

/* Navbar itself — standard Bootstrap rhythm */
.navbar {
  padding-top: 16px;
  padding-bottom: 16px;
}

@media (max-width: 767px) {
  .navbar-brand { margin: 0 auto 0 auto;}

}

</style>