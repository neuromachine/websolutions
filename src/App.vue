<script setup>

</script>

<template>
  <!-- Start Preloader Section -->
  <div class="preloader">
    <div class="loader">
      <div class="shadow"></div>
      <div class="box"></div>
    </div>
  </div>
  <!-- End Preloader Section -->



  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/product-list">Go to PL</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
