<script setup>

</script>

<template>
  <header class="header">
    <h6 class="subtitle">
      <slot name="subtitle"></slot>
    </h6>
    <h2 class="title">
      <slot name="title"></slot>
    </h2>
  </header>
</template>

<style scoped>
.header {margin-bottom: 2rem;}
.subtitle {
  color: #ff9800;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}
.title {
  color: #404040;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
}
@media (max-width: 767px) {
  .subtitle {
    font-size: 0.8rem;
  }
  .title {
    font-size: 1.5rem;
  }
}
</style>