<script setup>

</script>

<template>
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
