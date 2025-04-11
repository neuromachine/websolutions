<script setup>
defineProps({
  breadcrumbs: Array
});
</script>

<template>
  <!-- Start Page Title Section -->
  <div class="page-title-area item-bg2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="page-title-content">
            <h2>{{ breadcrumbs.at(-1)?.title }}</h2>
            <ul>
              <li v-for="(crumb, index) in breadcrumbs" :key="index">
                <RouterLink v-if="crumb.link && index !== breadcrumbs.length - 1" :to="crumb.link">
                  {{ crumb.title }}
                </RouterLink>
                <span v-else>{{ crumb.title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Page Title Section -->
</template>

<style scoped>
/* Можно добавить стили для хлебных крошек */
</style>
